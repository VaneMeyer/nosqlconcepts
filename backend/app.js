const express = require("express");
const { Pool } = require("pg");
const mongoose = require("mongoose");
const neo4j = require("neo4j-driver");
const cassandra = require("cassandra-driver");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

const app = express();
const key = Math.random() * (10000000000 - 100000000) + 100000000;

const oneDay = 1000 * 60 * 60 * 24;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(errorHandler);

// Session Configuration
app.use(
  session({
    secret: `${key}`,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// Set trust proxy once for the entire application
app.set("trust proxy", "loopback");

// Function for timeout when executing database queries
const executeQueryWithTimeout = (queryFunction, timeout) => {
  return new Promise((resolve, reject) => {
    const queryPromise = queryFunction();

    const timeoutId = setTimeout(() => {
      reject(new Error("Query execution timeout"));
    }, timeout);

    queryPromise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

// PostgreSQL connections
const pool = new Pool({
  host: process.env.PG_HOST2,
  user: process.env.PG_USER2,
  password: process.env.PG_PASSWORD2,
  database: process.env.PG_DATABASE,
});

const pool2 = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE2,
});

app.get("/", (req, res) => {
  const dir = "public";
  res.sendFile(path.join(__dirname, dir, "index.html"));
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const query =
      "SELECT * FROM private.users WHERE user_name = $1 AND password = $2;";
    const { rows } = await pool.query(query, [username, password]);

    if (rows.length === 1) {
      req.session.user = rows[0];
      res.json(req.session.user);
    } else {
      res.status(401).send("Wrong credentials");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server error occurred");
  }
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out");
});

// Execute SQL queries
app.post("/api/execute-sql", async (req, res) => {
  const { execQuery } = req.body;
  try {
    const queryFunction = () => pool.query(execQuery);
    const result = await executeQueryWithTimeout(queryFunction, 50000);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// execute MongoDB queries
const COLLECTION_MAP = {
  person: "person",
  email: "email",
  department: "department",
  knows: "knows",
  to: "to",
  cc: "cc",
};

const getModifiedQuery = (originalQuery) => {
  let modifiedQuery = originalQuery;

  for (const [key, value] of Object.entries(COLLECTION_MAP)) {
    if (originalQuery.includes(key)) {
      const replaceStr = `collection("${value}")`;
      modifiedQuery = modifiedQuery.replace(key, replaceStr);
      break; // Stop after first match
    }
  }

  return modifiedQuery;
};

app.post("/api/execute-mql", async (req, res) => {
  const { execQuery } = req.body;
  const modifiedQuery = getModifiedQuery(execQuery);

  try {
    const queryFunction = async () => {
      const db = mongoose.connection.useDb("enron");
      const query = eval(`${modifiedQuery}`);
      return await query.toArray();
    };

    const result = await executeQueryWithTimeout(queryFunction, 50000);
    res.json(result);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

mongoose
  .connect(process.env.MONGODATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// execute cypher queries
const driver = neo4j.driver(
  `${process.env.NEO_SERVER}`,
  neo4j.auth.basic(`${process.env.NEO_USER}`, `${process.env.NEO_PASSWORD2}`)
);

app.post("/api/execute-cypher", async (req, res) => {
  const { execQuery } = req.body;

  try {
    const session = driver.session();
    const result = await session.run(execQuery);
    session.close();

    if (result.summary.queryType === "r") {
      const records = result.records.map((record) => record.toObject());
      res.json(records);
    } else {
      res
        .status(400)
        .json({ message: "Only queries to read data are allowed" });
    }
  } catch (error) {
    console.error("Error with executing Neo4J query:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

// execute cql queries
const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINTS],
  localDataCenter: process.env.CASSANDRA_LOCAL_DATA_CENTER,
  keyspace: process.env.CASSANDRA_KEYSPACE,
});

client
  .connect()
  .then(() => console.log("Cassandra-Cluster connected"))
  .catch((err) =>
    console.error("Error while connecting Cassandra-Cluster:", err)
  );

app.post("/api/execute-cql", async (req, res) => {
  const { execQuery } = req.body;

  try {
    const result = await client.execute(execQuery, [], { prepare: true });
    res.json(result.rows);
  } catch (error) {
    console.error("Error while querying Cassandra data:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

//get TaskForm data and history data
const handleDataStorage = async (req, res, table) => {
  const {
    username,
    statementId,
    taskAreaId,
    queryText,
    isExecutable,
    resultSize,
    isCorrect,
    partialSolution,
    difficultyLevel,
    processingTime,
  } = req.body;

  const query = `
    SELECT * FROM ${table} WHERE username = $1 AND statement_id = $2 AND task_area_id = $3;
  `;

  try {
    const { rows } = await pool2.query(query, [
      username,
      statementId,
      taskAreaId,
    ]);

    if (rows.length !== 0) {
      const updateQuery = `
        UPDATE ${table} SET 
          is_correct = $4,
          partial_solution = $5,
          difficulty_level = $6,
          query_text = $7,
          is_executable = $8,
          result_size = $9,
          processing_time = $10
        WHERE 
          username = $1 
          AND statement_id = $2 
          AND task_area_id = $3;
      `;

      await pool2.query(updateQuery, [
        username,
        statementId,
        taskAreaId,
        isCorrect,
        partialSolution,
        difficultyLevel,
        queryText,
        isExecutable,
        resultSize,
        processingTime,
      ]);
    } else {
      const insertQuery = `
        INSERT INTO ${table} (
          username,
          statement_id,
          task_area_id,
          query_text,
          is_executable,
          result_size,
          is_correct,
          partial_solution,
          difficulty_level,
          processing_time
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
      `;

      await pool2.query(insertQuery, [
        username,
        statementId,
        taskAreaId,
        queryText,
        isExecutable,
        resultSize,
        isCorrect,
        partialSolution,
        difficultyLevel,
        processingTime,
      ]);
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving data:", error);
    return { success: false, error: error.message };
  }
};

// Save user data in usermanagement db
app.post("/api/store-data", async (req, res) => {
  const response = await handleDataStorage(req, res, "public.user_task_data");
  res.json(response);
});

// Save user history data in usermanagement db
app.post("/api/store-history-data", async (req, res) => {
  const {
    username,
    statementId,
    taskAreaId,
    queryText,
    isExecutable,
    resultSize,
    isCorrect,
  } = req.body;

  const query = `
    INSERT INTO public.query_history (
      username,
      statement_id,
      task_area_id,
      query_text,
      is_executable,
      result_size,
      is_correct
    ) VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  try {
    await pool2.query(query, [
      username,
      statementId,
      taskAreaId,
      queryText,
      isExecutable,
      resultSize,
      isCorrect,
    ]);
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    res.json({ success: false, error: error.message });
  }
});

//get statistics data
app.post("/solved-tasks-count", async (req, res) => {
  try {
    const query = `
      SELECT 
        task_area_id,
        ROUND(AVG(solved_tasks_count)) AS avg_solved_tasks_count,
        ROUND(AVG(correct_tasks_count)) AS avg_correct_tasks_count,
        ROUND(AVG(executable_tasks_count)) AS avg_executable_tasks_count
      FROM (
          SELECT 
              task_area_id,
              COUNT(data_id) AS solved_tasks_count,
              SUM(CASE WHEN is_correct = TRUE THEN 1 ELSE 0 END) AS correct_tasks_count,
              SUM(CASE WHEN is_executable = TRUE THEN 1 ELSE 0 END) AS executable_tasks_count
          FROM user_task_data
          GROUP BY task_area_id, username
      ) AS subquery
      GROUP BY task_area_id;
    `;

    const { rows } = await pool2.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching solved tasks count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get solved/executable/correct task count for each user
app.post("/user-solved-tasks-count", async (req, res) => {
  const { username } = req.body;

  try {
    const query = `
      SELECT 
          username,
          task_area_id,
          COUNT(data_id) AS avg_solved_tasks_count,
          SUM(CASE WHEN is_correct = TRUE THEN 1 ELSE 0 END) AS avg_correct_tasks_count,
          SUM(CASE WHEN is_executable = TRUE THEN 1 ELSE 0 END) AS avg_executable_tasks_count
      FROM user_task_data
      WHERE username = $1
      GROUP BY task_area_id, username;
    `;

    const { rows } = await pool2.query(query, [username]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching user's solved tasks count:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//average processing time for each database (area)
app.post("/avg-processing-time", async (req, res) => {
  try {
    const query = `
      SELECT 
          task_area_id,
          AVG(processing_time) AS avg_processing_time
      FROM 
          user_task_data
      GROUP BY 
          task_area_id
      ORDER BY 
          task_area_id;
    `;

    const { rows } = await pool2.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching average processing time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//avg processing time for user for each area

app.post("/user-avg-processing-time", async (req, res) => {
  const { username } = req.body;

  try {
    const query = `
      SELECT 
          username, 
          AVG(processing_time) AS avg_processing_time, 
          task_area_id
      FROM 
          user_task_data
      WHERE 
          username = $1
      GROUP BY 
          username, 
          task_area_id
      ORDER BY 
          task_area_id;
    `;

    const { rows } = await pool2.query(query, [username]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching user's average processing time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//difficulty level chart data

app.get("/difficulty-level", async (req, res) => {
  try {
    const query = `
      SELECT 
          task_area_id,
          difficulty_level,
          ROUND(AVG(task_count)) AS avg_task_count
      FROM 
          (
              SELECT 
                  task_area_id,
                  difficulty_level,
                  username,
                  COUNT(data_id) AS task_count
              FROM 
                  user_task_data
              WHERE 
                  difficulty_level != '0'
              GROUP BY 
                  task_area_id,
                  difficulty_level,
                  username
          ) AS subquery
      GROUP BY 
          task_area_id,
          difficulty_level
      ORDER BY 
          task_area_id,
          difficulty_level;
    `;

    const { rows } = await pool2.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching difficulty levels:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get users, that started working on the tasks
app.get("/total-users", async (req, res) => {
  try {
    const query = `
      SELECT 
          COUNT(DISTINCT username) AS total_users
      FROM 
          user_task_data;
    `;

    const { rows } = await pool2.query(query);
    res.json(rows);
    console.log(rows);
    
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//difficulty ratings
const getDifficultyRating = async (difficultyLevels, res) => {
  try {
    const { rows } = await pool2.query(`
      SELECT 
          ts.statement_id AS task_id,
          ta.area_name AS task_area,
          COUNT(utd.data_id) AS users_count
      FROM 
          user_task_data utd
      JOIN 
          task_statements ts ON utd.statement_id = ts.statement_id
      JOIN 
          task_areas ta ON utd.task_area_id = ta.area_id
      WHERE 
          utd.difficulty_level IN (${difficultyLevels
            .map((level) => `'${level}'`)
            .join(",")})
      GROUP BY 
          ts.statement_id, ta.area_name
      ORDER BY 
          users_count DESC
      LIMIT 1;
    `);
    res.json(rows);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.get("/difficulty-rating-easy", async (req, res) => {
  await getDifficultyRating(["Very easy", "Easy"], res);
});

app.get("/difficulty-rating-difficult", async (req, res) => {
  await getDifficultyRating(["Very difficult", "difficult"], res);
});

//get your history data for line chart
app.post("/api/get-history-data", async (req, res) => {
  const { username, limit } = req.body;
  try {
    const query = `
      SELECT 
          DATE(executed_at) AS x,
          COUNT(*) AS y
      FROM 
          query_history
      WHERE 
          username = $1
      GROUP BY 
          DATE(executed_at),
          username
      ORDER BY 
          x DESC, 
          username
      LIMIT $2;
    `;

    const { rows } = await pool2.query(query, [username, limit]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching history data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get TaskForm data
app.post("/getTaskFormData", async (req, res) => {
  const { username, taskNumber, taskAreaId } = req.body;
  try {
    const query = `
      SELECT 
          *
      FROM 
          public.user_task_data
      WHERE 
          username = $1
      AND 
          statement_id = $2
      AND 
          task_area_id = $3;
    `;

    const { rows } = await pool2.query(query, [
      username,
      taskNumber,
      taskAreaId,
    ]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching task form data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//example feedback postgreSQL task 1
app.get("/getCorrectResult", async (req, res) => {
  try {
    const query = `
      WITH persons_email_counts AS (
        SELECT 
          email.person.*, 
          COUNT(email.emails.id) AS no_emails 
        FROM 
          email.person 
        LEFT JOIN 
          email.emails ON email.person.email_address = email.emails.message_from 
        GROUP BY 
          email.person.id
      ),
      persons_100emails AS (
        SELECT * FROM persons_email_counts 
        WHERE no_emails > 100
      )
      SELECT 
        email.department.id, 
        COUNT(persons_100emails.id) 
      FROM 
        email.department 
      LEFT JOIN 
        persons_100emails ON email.department.id = works_in 
      GROUP BY 
        email.department.id;
    `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching correct result:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//page views
let pageViews = 0;

app.get("/track", (req, res) => {
  pageViews++;
  res.json({ pageViews });
});

app.get("/getViews", (req, res) => {
  res.json({ pageViews });
});

const port = process.env.PORT || 8000;
const pgPort = 8765;
const neoPort = process.env.NEO_PORT || 3001;
const casPort = process.env.CASSANDRA_PORT || 3002;

//start server
app.listen(port, () => {
  console.log(`App is running on port ${port} for MongoDB`);
});

app.listen(pgPort, () => {
  console.log(`App is running on port ${pgPort} for PostgreSQL`);
});

app.listen(neoPort, () => {
  console.log(`App is running on port ${neoPort} for Neo4J`);
});
app.listen(casPort, () => {
  console.log(`App is running on port ${casPort} for Cassandra`);
});
