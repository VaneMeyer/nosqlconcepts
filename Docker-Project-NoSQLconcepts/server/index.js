const express = require("express");
const { Pool } = require("pg");
const mongoose = require("mongoose");
const neo4j = require("neo4j-driver");
const cassandra = require("cassandra-driver");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const loginQueries = require("./queries/loginQueries");
const chartsQueries = require("./queries/chartsQueries");
const mainQueries = require("./queries/mainQueries");
const adminQueries = require("./queries/adminQueries");
const jwt = require('jsonwebtoken');
const helmet = require('helmet');


require("dotenv").config();

const app = express();
const key = Math.random() * (10000000000 - 100000000) + 100000000;

const oneDay = 1000 * 60 * 60 * 24;
//################# General Settings ######################################################
// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());

// Session Configuration
app.use(
  session({
    secret: `${key}`,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);


app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Origin-Agent-Cluster', '?1');
  next();
});

app.get("/", (req, res) => {
  const dir = "public";
  res.sendFile(path.join(__dirname, dir, "index.html"));
});

app.get('/conditions', (req, res) => {
      res.send(`By using this application, you agree to the following terms regarding the use of cookies and the collection of your data:  This application uses cookies to store your login information. Cookies are small text files stored on your device that
          help us remember your login details for future sessions and provide a
          better user experience.
          We collect and use the data you provide,
          including but not limited to answers to exercises, for the following
          purposes: To create and analyze statistics related to user performance
          and engagement. To perform Learning Analytics to improve the
          educational content and overall user experience. To ensure the
          effective functioning of the application and provide personalized
          content.
         We are committed to protecting your personal
          data. The information collected will be used in accordance with our
          privacy policy and only for the purposes stated above.
         By continuing to use this application, you consent to
          the storage of cookies on your device and the collection and use of
          your data as described. 
        
          Once you have completed the course, all your data will be permanently deleted from our systems.
         
          If you have any questions or concerns
          regarding our use of cookies and data, please contact us. Thank you
          for your understanding and cooperation.`);
});


// Set trust proxy once for the entire application
app.set("trust proxy", "loopback");

//################# new ########################################################
// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
const pool2 = new Pool({
  user: process.env.PG_USER2,
  host: process.env.PG_HOST2,
  database: process.env.PG_DATABASE2,
  password: process.env.PG_PASSWORD2,
  port: process.env.PG_PORT2,
});

//################# Login and Logout ######################################################
const SECRET_KEY = process.env.SECRET_KEY;
// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { loginQuery } = loginQueries;
    const { rows } = await pool2.query(loginQuery, [username, password]);

    if (rows.length === 1) {
      const user = rows[0];
      const token = jwt.sign({ id: user.id, role: user.role, username: user.user_name }, SECRET_KEY, { expiresIn: '6h' });

      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).send("Wrong credentials");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server error occurred");
  }
});

// Logout
app.get("/api/logout", (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.send("Logged out");
});


const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
// Check Auth Route
app.get('/api/check-auth', authenticateJWT, (req, res) => {
  
  res.json(req.user);
});
// protected route
app.get('/api/admin', authenticateJWT, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Admin access granted' });
  } else {
    res.sendStatus(403);
  }
});




//################# Charts Data ######################################################


const executeQuery = async (query, params, res) => {
  try {
    const { rows } = await pool2.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error, res);
  }
};

// POST /solved-tasks-count
app.post("/api/solved-tasks-count", async (req, res) => {
  await executeQuery(chartsQueries.solvedTaskCountQuery, [], res);
});
// POST /user-solved-tasks-count
app.post("/api/user-solved-tasks-count", async (req, res) => {
  const { username } = req.body;
  await executeQuery(chartsQueries.userSolvedTaskCountQuery, [username], res);
});
// POST /avg-processing-time
app.post("/api/avg-processing-time", async (req, res) => {
  await executeQuery(chartsQueries.avgProcessingTimeQuery, [], res);
});

// POST /user-avg-processing-time
app.post("/api/user-avg-processing-time", async (req, res) => {
  const { username } = req.body;
  await executeQuery(chartsQueries.userAvgProcessingTimeQuery, [username], res);
});

// POST /get-history-data
app.post("/api/get-history-data", async (req, res) => {
  const { username, limit } = req.body;
  await executeQuery(
    chartsQueries.historyLineChartQuery,
    [username, limit],
    res
  );
});

// GET /difficulty-level
app.get("/api/difficulty-level", async (req, res) => {
  await executeQuery(chartsQueries.difficultyLevelQuery, [], res);
});

// GET /total-users
app.get("/api/total-users", async (req, res) => {
  await executeQuery(chartsQueries.totalUsersQuery, [], res);
});

// GET /difficulty-rating-easy
app.get("/api/difficulty-rating-easy", async (req, res) => {
  await getDifficultyRating(["Very easy", "Easy"], res);
});

// GET /difficulty-rating-difficult
app.get("/api/difficulty-rating-difficult", async (req, res) => {
  await getDifficultyRating(["Very difficult", "Difficult"], res);
});

// Funktion zur Abfrage der Schwierigkeitsbewertung
const getDifficultyRating = async (difficultyLevels, res) => {
  try {
    const { rows } = await pool2.query(`
      SELECT 
          ts.statement_id AS task_id,
          ta.area_name AS task_area,
          COUNT(utd.data_id) AS users_count
      FROM 
          tool.user_task_data utd
      JOIN 
          tool.task_statements ts ON utd.statement_id = ts.statement_id
      JOIN 
          tool.task_areas ta ON utd.task_area_id = ta.area_id
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
    if (rows.length === 0) {
      res.json("No user data available");
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error(error, res);
  }
};

//################# Main Data ######################################################
// GET /gettimer
app.post("/api/gettimer", async (req, res) => {
  const {username, areaId, taskNumber} = req.body;
  await executeQuery(mainQueries.getTimerQuery, [username, areaId, taskNumber], res);
});

// POST /posttimer
app.post("/api/posttimer", async (req, res) => {
  const { username, areaId, taskNumber, time } = req.body;

  await executeQuery(
    mainQueries.postTimerQuery,
    [username, areaId, taskNumber, time],
    res
  );
});

// GET /area-names
app.get("/api/area-names", async (req, res) => {
  await executeQuery(mainQueries.areaNamesQuery, [], res);
});

// POST /gethistory
app.post("/api/gethistory", async (req, res) => {
  const { username, databasetype } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!username || !databasetype) {
    return res.status(400).send("Missing username or databasetype");
  }

  await executeQuery(
    mainQueries.getHistoryQuery,
    [username, databasetype],
    res
  );
});
//POST /getDownloadDataFromDB
app.post("/api/getDownloadDataFromDB", async (req, res) => {
  const { areaId, username } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!username || !areaId) {
    return res.status(400).send("Missing username or areaId");
  }

  await executeQuery(
    mainQueries.getDownloadDataFromDBQuery,
    [areaId, username],
    res
  );
});

// POST /gethistory
app.post("/api/gethistory", async (req, res) => {
  const { username, databasetype } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!username || !databasetype) {
    return res.status(400).send("Missing username or databasetype");
  }

  await executeQuery(
    mainQueries.getHistoryQuery,
    [username, databasetype],
    res
  );
});
// POST /get-user-data
app.post("/api/get-user-data", async (req, res) => {
  const { username, databasetype } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!username || !databasetype) {
    return res.status(400).send("Missing username or databasetype");
  }

  await executeQuery(
    mainQueries.getUserDataQuery,
    [username, databasetype],
    res
  );
});

//POST getTasks
app.post("/api/getTasks", async (req, res) => {
  const { areaId } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!areaId) {
    return res.status(400).send("Missing areaId");
  }

  await executeQuery(
    mainQueries.getTasksQuery,
    [areaId],
    res
  );
});

//POST getDataFromDB
app.post("/api/getDataFromDB", async (req, res) => {
  const { areaId, username, tasknumber } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!areaId || !username || !tasknumber) {
    return res.status(400).send("Missing areaId, username or tasknumber");
  }

  await executeQuery(
    mainQueries.getTaskFormDataQuery,
    [areaId, username, tasknumber],
    res
  );
});

//POST store-data
const handleDataStorage = async (req, res, table) => {
  const {
 dataToSend
  } = req.body;

  //const { handleDataStorageReadQuery } = queries;
  const handleDataStorageReadQuery = `SELECT * FROM ${table} WHERE username = $1 AND statement_id = $2 AND task_area_id = $3;`;
  try {
    const { rows } = await pool2.query(handleDataStorageReadQuery, [
      /* table, */
      dataToSend.username,
      dataToSend.statementId,
      dataToSend.taskAreaId,
    ]);

    if (rows.length !== 0) {
      //const { handleDataStorageUpdateQuery } = queries;
      const handleDataStorageUpdateQuery = ` UPDATE ${table} SET 
is_correct = $4,
partial_solution = $5,
difficulty_level = $6,
query_text = $7,
is_executable = $8,
result_size = $9,
processing_time = $10,
is_finished = $11
WHERE 
username = $1 
AND statement_id = $2 
AND task_area_id = $3;`;
      await pool2.query(handleDataStorageUpdateQuery, [
        dataToSend.username,
        dataToSend.statementId,
        dataToSend.taskAreaId,
        dataToSend.isCorrect,
        dataToSend.partialSolution,
        dataToSend.difficultyLevel,
        dataToSend.queryText,
        dataToSend.isExecutable,
        dataToSend.resultSize,
        dataToSend.processingTime,
        dataToSend.isFinished
        /* table, */
      ]);
    } else {
      //const { handleDataStorageInsertQuery } = queries;
      const handleDataStorageInsertQuery = `INSERT INTO ${table} (
  username,
  statement_id,
  task_area_id,
  query_text,
  is_executable,
  result_size,
  is_correct,
  partial_solution,
  difficulty_level,
  processing_time,
  is_finished
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
      await pool2.query(handleDataStorageInsertQuery, [
        dataToSend.username,
        dataToSend.statementId,
        dataToSend.taskAreaId,
        dataToSend.queryText,
        dataToSend.isExecutable,
        dataToSend.resultSize,
        dataToSend.isCorrect,
        dataToSend.partialSolution,
        dataToSend.difficultyLevel,
        dataToSend.processingTime,
        dataToSend.isFinished
        /* table, */
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
  const response = await handleDataStorage(req, res, "tool.user_task_data");
  res.json(response);
});

//POST store-history-data
app.post("/api/store-history-data", async (req, res) => {
  const { dataToSend } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!dataToSend) {
    return res.status(400).send("Missing dataToSend");
  }

  await executeQuery(
    mainQueries.storeHistoryDataQuery,
    [ dataToSend.username,
      dataToSend.statementId,
      dataToSend.taskAreaId,
      dataToSend.queryText,
      dataToSend.isExecutable,
      dataToSend.resultSize,
      dataToSend.isCorrect,],
    res
  );
});

//################# Admin ######################################################

// GET /getUsers
app.get("/api/getUsers", async (req, res) => {
  await executeQuery(adminQueries.getUsersQuery, [], res);
});
// GET /getExercises
app.get("/api/getexercises", async (req, res) => {
  await executeQuery(adminQueries.getAllExercisesQuery, [], res);
});
// GET /getUserTaskData
app.get("/api/getUserTaskData", async (req, res) => {
  await executeQuery(adminQueries.getAllUserTaskData, [], res);
});
// GET /getHistoryData
app.get("/api/getHistoryData", async (req, res) => {
  await executeQuery(adminQueries.getAllHistoryData, [], res);
});

// POST /delete-exercises
app.post("/api/delete-exercises", async (req, res) => {
  const { statement_id, area_id } = req.body;
  await executeQuery(
    adminQueries.deleteExerciseQuery,
    [statement_id, area_id],
    res
  );
});
// POST /add-exercise
app.post("/api/add-exercise", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.addExerciseQuery,
    [
      formValues.statement_id,
      formValues.area_id,
      formValues.statement_text,
      formValues.solution_query,
      formValues.topic,
      formValues.subtasknumber,
      formValues.maxtime,
      formValues.hint,
      formValues.tasknumber,
    ],
    res
  );
});
// POST /update-exercises
app.post("/api/update-exercises", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.updateExerciseQuery,
    [
      formValues.statement_text,
      formValues.solution_query,
      formValues.topic,
      formValues.subtasknumber,
      formValues.maxtime,
      formValues.hint,
      formValues.tasknumber,
      formValues.statement_id,
      formValues.area_id,
    ],
    res
  );
});


// POST /add-assignments
app.post("/api/add-assignment", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.addAssignmentQuery,
    [
      formValues.area_id,
      formValues.area_name,
      formValues.descr,
      formValues.link,
      formValues.endpoint,
      formValues.is_active,
    ],
    res
  );
});

// GET /get-assignments
app.get("/api/get-assignments", async (req, res) => {
  await executeQuery(adminQueries.getAllAssignmentsQuery, [], res);
});

// POST /update-assignment
app.post("/api/update-assignment", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.updateAssignmentQuery,
    [
      formValues.area_id,
      formValues.area_name,
      formValues.descr,
      formValues.link,
      formValues.endpoint,
      formValues.is_active,
      formValues.feedback_on,
    ],
    res
  );
});

// POST /delete-assignment
app.post("/api/delete-assignment", async (req, res) => {
  const { area_id } = req.body;
  await executeQuery(
    adminQueries.deleteAssignmentQuery,
    [ area_id],
    res
  );
});

// POST /delete-userdata
app.post("/api/delete-userdata", async (req, res) => {
  const { userdata } = req.body;
  await executeQuery(
    adminQueries.deleteUserDataQuery,
    [userdata.data_id],
    res
  );
});
// POST /delete-alluserdata
app.post("/api/delete-alluserdata", async (req, res) => {
  const { username } = req.body;
  await executeQuery(
    adminQueries.deleteAllUserDataQuery,
    [username],
    res
  );
});
// POST /delete-alluserdata
app.post("/api/delete-allhistorydata", async (req, res) => {
  const { username } = req.body;
  await executeQuery(
    adminQueries.deleteAllHistoryDataQuery,
    [username],
    res
  );
});

//POST /get-status
app.post("/api/get-status", async (req, res) => {
  const { areaId } = req.body;
  await executeQuery(
    adminQueries.getStatusQuery,
    [ areaId],
    res
  );
});

//POST /update-status
app.post("/api/update-status", async (req, res) => {
  const { areaId, checked } = req.body;
  await executeQuery(
    adminQueries.updateStatusQuery,
    [ areaId, checked],
    res
  );
});

//################# get DB's Structure ######################################################

// Queryfunction for the structure of the PostgreSQL-DB.
const { getPgStructureQuery } = mainQueries;

app.get("/api/getPostgreSQLStructure", async (req, res) => {
  try {
    const postgreSQL_query = () => pool.query(getPgStructureQuery);
    let result = await executeQueryWithTimeout(postgreSQL_query, 50000);

    tables_set = new Set();
    for (let entry in result.rows) {
      tables_set.add(result.rows[entry].table_name);
    }
    tables = Array.from(tables_set);

    columns = [];
    for (let table in tables) {
      columns.push([]);
    }
    for (let entry in result.rows) {
      let i = tables.indexOf(result.rows[entry].table_name);
      let temp_entry = result.rows[entry];
      columns[i].push({
        table_name: temp_entry.table_name,
        column_name: temp_entry.column_name,
        data_type:
          temp_entry.udt_name +
          (temp_entry.character_maximum_length != null
            ? "(" + temp_entry.character_maximum_length + ")"
            : ""),
        foreign_column_name:
          temp_entry.foreign_table_name != null
            ? temp_entry.foreign_table_name +
              "." +
              temp_entry.foreign_column_name
            : " ",
      });
    }

    res.json({ tables: tables, columns: columns });
  } catch {
    console.log("Error in /getPostgreSQLStructure.");
  }
});
app.set("trust proxy", "loopback");
 
app.get("/api/getMongoStructure", async (req, res) => {
  let list_of_collections = [];
  let list_of_fields = [];
  let pipeline = [
    { $project: { fields: { $objectToArray: "$$ROOT" } } },
    { $unwind: "$fields" },
    {
      $group: {
        _id: "$fields.k",
        datatype: { $addToSet: { $type: "$fields.v" } },
      },
    },
  ];

  let collection_query;
  let current_collection;
  let field_query;
  let temp_list;

  try { 
    const db = conn2.useDb("exampledb"); 

    // Filter out system collections
    collection_query = await db.db.listCollections({ name: { $regex: /^(?!system\.)/ } }).toArray(); 
    
    for (let collection of collection_query) {
      if (collection.name == "startup_log") {
        continue;
      }
      list_of_collections.push(collection.name);
      current_collection = db.collection(collection.name); 
      
      try {
        field_query = await current_collection.aggregate(pipeline).toArray();
      } catch (aggError) {
        console.error(`Aggregation error on collection ${collection.name}:`, aggError);
        continue;
      }

      temp_list = [];
      for (let field of field_query) {
        temp_list.push({ name: field._id, datatype: field.datatype[0] });
      }
      list_of_fields.push(temp_list);
    }
    
    res.json({ tables: list_of_collections, columns: list_of_fields });
  } catch (error) {
    console.error("Error while fetching MongoDB structure:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get("/api/getNeo4JStructure", async (req, res) => {
  try {
    const session = driver.session();
    const result = await session.run("CALL db.schema.visualization");
    const result_node_properties = await session.run(
      "CALL db.schema.nodeTypeProperties()"
    );
    const result_rel_properties = await session.run(
      "CALL db.schema.relTypeProperties()"
    );
    session.close();

    if (result.summary.queryType === "r") {
      nodes_index = 0;
      relationship_index = 1;

      nodes = result.records[0]._fields[nodes_index];
      let cleaned_nodes = [];
      let node_refs = {};
      for (const node in nodes) {
        cleaned_nodes.push({
          id: nodes[node].elementId,
          name: nodes[node].properties.name,
        });
        node_refs[nodes[node].elementId] = {
          name: nodes[node].properties.name,
        };
      }

      let arr_node_refs = [];
      for (const elem in node_refs) {
        arr_node_refs.push(node_refs[elem].name);
      }

      cleaned_nodes_props = [];
      for (const n in arr_node_refs) {
        cleaned_nodes_props.push([]);
      }

      for (const node_prop in result_node_properties.records) {
        let i = arr_node_refs.indexOf(
          result_node_properties.records[node_prop]._fields[0].substring(
            2,
            result_node_properties.records[node_prop]._fields[0].length - 1
          )
        );
        cleaned_nodes_props[i].push({
          type: result_node_properties.records[node_prop]._fields[0],
          label: String(result_node_properties.records[node_prop]._fields[1]),
          property: String(
            result_node_properties.records[node_prop]._fields[2]
          ),
          datatype: String(
            result_node_properties.records[node_prop]._fields[3]
          ),
          mandatory: String(
            result_node_properties.records[node_prop]._fields[4]
          ),
        });
      }

      let relationships = result.records[0]._fields[relationship_index];
      let cleaned_relationships = [];
      for (const relationship in relationships) {
        cleaned_relationships.push({
          id: relationships[relationship].elementId,
          name: relationships[relationship].properties.name,
          start: node_refs[relationships[relationship].startNodeElementId].name,
          end: node_refs[relationships[relationship].endNodeElementId].name,
        });
      }

      let arr_rel_refs = [];
      for (const elem in cleaned_relationships) {
        arr_rel_refs.push(cleaned_relationships[elem].name);
      }

      cleaned_rel_props = [];
      for (const n in arr_rel_refs) {
        cleaned_rel_props.push([]);
      }

      for (const rel_prop in result_rel_properties.records) {
        let i = arr_rel_refs.indexOf(
          result_rel_properties.records[rel_prop]._fields[0].substring(
            2,
            result_rel_properties.records[rel_prop]._fields[0].length - 1
          )
        );
        cleaned_rel_props[i].push({
          type: result_rel_properties.records[rel_prop]._fields[0],
          property: String(result_rel_properties.records[rel_prop]._fields[1]),
          datatype: String(result_rel_properties.records[rel_prop]._fields[2]),
          mandatory: String(result_rel_properties.records[rel_prop]._fields[3]),
        });
      }

      res.json({
        nodes: cleaned_nodes,
        relationships: cleaned_relationships,
        node_props: cleaned_nodes_props,
        rel_props: cleaned_rel_props,
      });
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

app.get("/api/getCassandraStructure", async (req, res) => {
  let list_of_tables = [];
  let list_of_columns = [];
  try {
    const tablesQuery = await client.execute(
      "SELECT table_name FROM system_schema.tables WHERE keyspace_name = ?;",
      ["mykeyspace"]
    );

    for (const table of tablesQuery.rows) {
      list_of_tables.push(table.table_name);

      const columnsQuery = await client.execute(
        "SELECT column_name, type FROM system_schema.columns WHERE keyspace_name = ? AND table_name = ?;",
        ["mykeyspace", table.table_name]
      );

      const tempList = columnsQuery.rows.map((row) => ({
        name: row.column_name,
        datatype: row.type,
      }));
      list_of_columns.push(tempList);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  res.json({ tables: list_of_tables, columns: list_of_columns });
  
});

//################# Query Execution ######################################################
//################# Timeout Function ######################################################
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
// Execute SQL queries
// check if query is equal to the expected solution
app.post("/api/execute-sql", async (req, res) => {
  const { execQuery, taskNumber, taskAreaId } = req.body;

  try {
    // Execute user's SQL query
    let userQueryResult = [{}];
    if (!execQuery.includes("private") && !execQuery.includes("tool")) {
      userQueryResult = await executeQueryWithTimeout(
        () => pool.query(execQuery),
        50000
      );
      try {
        // Check if the user's query matches the expected solution
        const { getSolutionQuery } = mainQueries;
        const expectedSolutionResult = await executeQueryWithTimeout(
          () => pool2.query(getSolutionQuery, [taskNumber, taskAreaId]),
          50000
        );
        const solution = await executeQueryWithTimeout(
          () => pool.query(expectedSolutionResult.rows[0].solution_query),
          50000
        );
        // Send both results to the client
        res.json({
          userQueryResult: userQueryResult.rows,
          expectedResult: solution.rows,
        });
      } catch (error) {
        res.json({
          userQueryResult: userQueryResult.rows,
          expectedResult: "no solution",
        });
      }
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
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
  // Handle find with projection translation
  const findWithProjectionPattern = /\.find\(\s*({[^}]*})?\s*,\s*({[^}]*})\s*\)/;
  const findMatches = modifiedQuery.match(findWithProjectionPattern);

  if (findMatches) {
    const filter = findMatches[1] ? findMatches[1] : '{}';
    const projection = findMatches[2];
    modifiedQuery = modifiedQuery.replace(findWithProjectionPattern, `.aggregate([{ $match: ${filter} }, { $project: ${projection} }])`);
  }
 //handle count
  const findCountPattern = /\.count\((.*?)\)/;
  // Translate count query
  const findCountMatches = modifiedQuery.match(findCountPattern);
  if (findCountMatches) {
    const filter = findCountMatches[1].trim();
    modifiedQuery = modifiedQuery.replace(findCountPattern, `.countDocuments(${filter})`);
  }
  return modifiedQuery;
};


   const conn1 = mongoose.createConnection(process.env.MONGODATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  
  conn1.on('connected', () => {
    console.log('MongoDB 1 connected');
  });
  
  conn1.on('error', (err) => {
    console.error('MongoDB 1 connection error:', err);
  });
  
  
  const conn2 = mongoose.createConnection(process.env.MONGODATABASE2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  
  conn2.on('connected', () => {
    console.log('MongoDB 2 connected');
  });
  
  conn2.on('error', (err) => {
    console.error('MongoDB 2 connection error:', err);
  });
 
app.post("/api/execute-mql", async (req, res) => {
  const { execQuery, taskNumber, taskAreaId } = req.body;
  const modifiedQuery = getModifiedQuery(execQuery);

  try {
 
    const queryFunction = async () => {
      const db = conn1.useDb("exampledb");
  
      
      const singleValueMethods = [
        'countDocuments', 
        'estimatedDocumentCount', 
         'distinct', 
        'findOne',
        'aggregate' 
        
      ];
  
      const query = await eval(`${modifiedQuery}`);
      
      
      const isSingleValueQuery = singleValueMethods.some(method => modifiedQuery.includes(method));
  
      if (isSingleValueQuery) {
       
        if (typeof query === 'object' && typeof query.toArray === 'function') {
          return await query.toArray(); 
        }
       
       return await JSON.stringify(query)
      } else {
       
        return await query.toArray();
      }
    };

  

    const result = await executeQueryWithTimeout(queryFunction, 50000);
    
    
    try {
      // Check if the user's query matches the expected solution
      const { getSolutionQuery } = mainQueries;
      const expectedSolutionResult = await executeQueryWithTimeout(
        () => pool2.query(getSolutionQuery, [taskNumber, taskAreaId]),
        50000
      );

      const solutionmql = expectedSolutionResult.rows[0].solution_query;
      const modifiedSolutionQuery = getModifiedQuery(solutionmql);
      const solutionFct = async () => {
        const db = conn1.useDb("exampledb");
        
        const query2 = eval(`${modifiedSolutionQuery}`);
        return await query2.toArray() ;
      };
      const solutionresult = await executeQueryWithTimeout(solutionFct, 50000);
      // Send both results to the client
     
      res.json({
        userQueryResult: result,
        expectedResult: solutionresult,
      });
      
     
    } catch (error) {
      res.json({
        userQueryResult: result,
        expectedResult: "no solution",
      });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
   
  }
});  
 





 

// execute cypher queries
const driver = neo4j.driver(
  `${process.env.NEO_SERVER}`,
  neo4j.auth.basic(`${process.env.NEO_USER}`, `${process.env.NEO_PASSWORD2}`)
);

app.post("/api/execute-cypher", async (req, res) => {
  const { execQuery, taskNumber, taskAreaId } = req.body;

  try {
    const session = driver.session();
    const result = await session.run(execQuery);
    session.close();

    if (result.summary.queryType === "r") {
      const records = result.records.map((record) => record.toObject());
      try {
        // Check if the user's query matches the expected solution
        const { getSolutionQuery } = mainQueries;
        const expectedSolutionResult = await executeQueryWithTimeout(
          () => pool2.query(getSolutionQuery, [taskNumber, taskAreaId]),
          50000
        );
        const session = driver.session();
        const solutioncypher = expectedSolutionResult.rows[0].solution_query;
        const solution = await session.run(solutioncypher);
        const solutionrecords = solution.records.map((record) =>
          record.toObject()
        );
        session.close();
        // Send both results to the client
        res.json({
          userQueryResult: records,
          expectedResult: solutionrecords,
        });
      } catch (error) {
        res.json({
          userQueryResult: records,
          expectedResult: "no solution",
        });
      }
    } else {
      res
        .status(400)
        .json({ message: "Only queries to read data are allowed" });
    }
  } catch (error) {
    console.error("Error with executing Neo4J query:", error);
    res.status(500).json({ error: error.message });
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
  const { execQuery, taskNumber, taskAreaId } = req.body;

  try {
    const userQueryResult = await client.execute(execQuery, [], {
      prepare: true,
    });
    try {
      // Check if the user's query matches the expected solution
      const { getSolutionQuery } = mainQueries;
      const expectedSolutionResult = await executeQueryWithTimeout(
        () => pool2.query(getSolutionQuery, [taskNumber, taskAreaId]),
        50000
      );
      const solutioncql = expectedSolutionResult.rows[0].solution_query;
      const solution = await client.execute(solutioncql, [], { prepare: true });
      // Send both results to the client
      res.json({
        userQueryResult: userQueryResult.rows,
        expectedResult: solution.rows,
      });
    } catch (error) {
      res.json({
        userQueryResult: userQueryResult.rows,
        expectedResult: "No solution available",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

 
}); 


//################# student projects SS24 ######################################################
//################# project 4 SS24 ######################################################
// Example route to get data from the database
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool2.query('SELECT * FROM tool.user_task_data');
    res.json(result.rows); // Send fetched data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});

// Route to get task-related data
app.post('/api/task_data', async (req, res) => {
  const {selectedTaskAreaId} = req.body;
  try {
    const result_task_data = await pool2.query('SELECT * FROM tool.task_statements where area_id = $1 order by statement_id', [selectedTaskAreaId]);
    res.json(result_task_data.rows); // Send fetched task data as JSON response
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});

// Route to get user-related data
app.get('/api/user_data', async (req, res) => {
  try {
    const result_user_data = await pool2.query('SELECT distinct username FROM tool.user_task_data');
    res.json(result_user_data.rows); // Send fetched user data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});

// Route to get area-related data
app.get('/api/area_data', async (req, res) => {
  try {
    const result_area_data = await pool2.query('SELECT * FROM tool.task_areas');
    res.json(result_area_data.rows); // Send fetched area data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});
//################# project 5 SS24 ######################################################
// Route to get data from the database
app.get('/api/get-data', async (req, res) => {
  try {
      const result = await pool2.query('SELECT * FROM private.users');
      term_res = res.json(result.rows);
      //console.log(term_res);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Route to create a new user
app.post('/api/add-user', async (req, res) => {
  //console.log("add-user", req.body)
  try {
      const { user_name, password, role } = req.body;
      //console.log(req.body);
      const newUser = await pool2.query(
          'INSERT INTO private.users (user_name, password, role) VALUES ($1, $2, $3) RETURNING *',
          [user_name, password, role]
      );
      res.status(201).json(newUser.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Route to update an existing user
app.put('/api/update-user', async (req, res) => {
 // console.log("update-user", req.body)
  try {
      const { user_name, password, role } = req.body;
      const userCheck = await pool2.query('SELECT * FROM private.users WHERE user_name = $1', [user_name]);

      if (userCheck.rows.length === 0) {
          return res.status(404).send('User not found');
      }

      const updatedUser = await pool2.query(
          'UPDATE private.users SET password = $2, role = $3 WHERE user_name = $1 RETURNING *',
          [user_name, password, role]
      );
      res.status(200).json(updatedUser.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Route to get user by username
app.get('/api/get-user-by-username/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const query = 'SELECT * FROM private.users WHERE user_name = $1';
      const result = await pool2.query(query, [username]);

      if (result.rows.length > 0) {
          res.json(result.rows[0]); // return user found
      } else {
          res.json(null); // returns null if no user found
      }
  } catch (error) {
      console.error('Error fetching user by username:', error);
      res.status(500).send('Server Error');
  }
});

// Route to delete a user by its username
app.delete('/api/delete-user/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const query = 'DELETE FROM private.users WHERE user_name = $1';
      await pool2.query(query, [username]);

      res.json({ message: 'Benutzer erfolgreich gelöscht' });
  } catch (error) {
      console.error('Fehler beim Löschen des Benutzers:', error);
      res.status(500).send('Serverfehler');
  }
});

//################# student projects WS24/25 ######################################################
//################# project 2 ######################################################
// Database call to get all surveys
const getSurveys = async () => {
  try {
    const result = await pool2.query('SELECT * FROM surveys ORDER BY created_at DESC');
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Database call to get all active surveys a specific user did not finished
const getActiveSurveys = async (username) => {
  try {
    const result = await pool2.query('SELECT * FROM surveys WHERE status = \'active\' AND survey_id NOT IN (SELECT survey_id FROM users_surveys WHERE user_name = $1) ORDER BY started_at DESC', [username]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Database call to get the results of a specific survey
const getSurveyResults = async (surveyId) => {
  try {
    const result = await pool2.query(`SELECT question_id, question_text, question_type, answer_id, answer_text, selection_count, answers
      FROM
      (SELECT q.question_id AS question_id, q.question_text AS question_text, q.type AS question_type, a.answer_id AS answer_id, a.answer_text AS answer_text, COUNT(ua.answer_id) AS selection_count, '' AS answers FROM questions q 
      INNER JOIN answers a ON q.question_id = a.question_id
      LEFT JOIN users_answers ua ON a.answer_id = ua.answer_id
      WHERE q.survey_id = $1 AND (q.type = 'yes/no' OR q.type = 'multiple choice')
      GROUP BY q.question_id, q.question_text, q.type, a.answer_id, a.answer_text)
      UNION ALL
      (SELECT q.question_id as question_id, q.question_text AS question_text, q.type AS question_type, a.answer_id AS answer_id, a.answer_text AS answer_text, COUNT(ua.answer_id) AS selection_count, ua.text AS answer FROM questions q 
      INNER JOIN answers a ON q.question_id = a.question_id
      LEFT JOIN users_answers ua ON a.answer_id = ua.answer_id
      WHERE q.survey_id = $1 AND q.type = 'free text'
      GROUP BY q.question_id, q.question_text, q.type, a.answer_id, a.answer_text, ua.text)
      UNION ALL
      (SELECT q.question_id AS question_id, CONCAT(qh.question_text, ' - ', q.question_text) AS question_text, q.type AS question_type, a.answer_id AS answer_id, a.answer_text AS answer_text, COUNT(ua.answer_id) AS selection_count, '' AS answers FROM questions q 
      INNER JOIN questions qh ON qh.question_id = q.head_question_id
      INNER JOIN answers a ON q.question_id = a.question_id
      LEFT JOIN users_answers ua ON a.answer_id = ua.answer_id
      WHERE q.survey_id = $1 AND q.type = 'mc matrix sub'
      GROUP BY q.question_id, qh.question_text, q.question_text, q.type, a.answer_id, a.answer_text)
      ORDER BY question_id, answer_id`, [surveyId]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Database call to get the number of participants of a specific survey
const getNumParticipants = async (surveyId) => {
  try {
    const result = await pool2.query(`SELECT count(DISTINCT user_name) as num FROM users_answers 
      WHERE answer_id IN (SELECT answer_id FROM answers WHERE question_id IN (SELECT question_id FROM questions WHERE survey_id = $1))`, [surveyId]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Database call to add a new survey
const addSurvey = async (title) => {
  try {
    const result = await pool2.query('INSERT INTO surveys (title, created_at) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *', [title]);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

// Database call to change the survey title of a specific survey
const updateSurvey = async (surveyId, title) => { 
  try { 
    const result = await pool2.query('UPDATE surveys SET title = $1 WHERE survey_id = $2 RETURNING *', [title, surveyId]); 
    return result.rows[0]; 
  } catch (err) { 
    throw err; 
  } 
};

// Database call to start a specific survey
const startSurvey = async (surveyId) => {
  try { 
    const result = await pool2.query('UPDATE surveys SET status = \'active\', started_at = CURRENT_TIMESTAMP WHERE survey_id = $1 RETURNING *', [surveyId]); 
    return result.rows[0]; 
  } catch (err) { 
    throw err; 
  } 
};

// Database call to stop a specific survey
const stopSurvey = async (surveyId) => {
  try { 
    const result = await pool2.query('UPDATE surveys SET status = \'finished\', finished_at = CURRENT_TIMESTAMP WHERE survey_id = $1 RETURNING *', [surveyId]); 
    return result.rows[0]; 
  } catch (err) { 
    throw err; 
  } 
};

// Database call to copy a specific survey
const copySurvey = async (surveyId) => {
  const client = await pool2.connect();

  try {
    await client.query('BEGIN');

    // Copy the survey
    const surveyResult = await client.query('INSERT INTO surveys (title, created_at) SELECT title || \' (Copy)\', CURRENT_TIMESTAMP FROM surveys WHERE survey_id = $1 RETURNING *', [surveyId]);
    const newSurveyId = surveyResult.rows[0].survey_id;

    // Copy all question of the survey
    const questionsResult = await client.query('SELECT question_id, question_text, type FROM questions WHERE type <> \'mc matrix sub\' AND survey_id = $1', [surveyId]);
    const insertPromises = questionsResult.rows.map(async (q) => {
      
      if (q.type == 'mc matrix head'){
        const resultQuestion = await client.query('INSERT INTO questions (survey_id, question_text, type) VALUES ($1, $2, $3) RETURNING question_id;', [newSurveyId, q.question_text, q.type]);
        const newQuestionId = resultQuestion.rows[0].question_id;
      
        const questionsResult = await client.query('SELECT question_id, question_text, type FROM questions WHERE head_question_id = $1 AND survey_id = $2', [q.question_id, surveyId]);

        // Copy all subquestions
        const insertSubPromises = questionsResult.rows.map(async (sq) => {
          const resultSubQuestion = await client.query('INSERT INTO questions (survey_id, question_text, type, head_question_id) VALUES ($1, $2, $3, $4) RETURNING question_id;', [newSurveyId, sq.question_text, sq.type, newQuestionId]);
          const newSubQuestionId = resultSubQuestion.rows[0].question_id;

          // Copy all answers of the subquestion
          const resultAnswersSub = await client.query('SELECT answer_text FROM answers WHERE question_id = $1;', [sq.question_id]);
          const answersSub = resultAnswersSub.rows;

          const answerSubPromises = answersSub.map(async (answer) => {
            await client.query('INSERT INTO answers (question_id, answer_text) VALUES ($1, $2);', [newSubQuestionId, answer.answer_text]);
          });

          await Promise.all(answerSubPromises);
        });
        await Promise.all(insertSubPromises);

      } else {
        const resultQuestion = await client.query('INSERT INTO questions (survey_id, question_text, type, head_question_id) VALUES ($1, $2, $3, $4) RETURNING question_id;', [newSurveyId, q.question_text, q.type, q.head_question_id]);
        const newQuestionId = resultQuestion.rows[0].question_id;
      
        // Copy all answers of the question
        const resultAnswers = await client.query('SELECT answer_text FROM answers WHERE question_id = $1;', [q.question_id]);
        const answers = resultAnswers.rows;

        const answerPromises = answers.map(async (answer) => {
          await client.query('INSERT INTO answers (question_id, answer_text) VALUES ($1, $2);', [newQuestionId, answer.answer_text]);
        });

        await Promise.all(answerPromises);
      }
    });

    await Promise.all(insertPromises);

    await client.query('COMMIT');
    return surveyResult.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Database call to delete a specific survey
const deleteSurvey = async (surveyId) => { 
  try { 

    // Delete the survey
    await pool2.query('DELETE FROM surveys WHERE survey_id = $1', [surveyId]); 
    const result = await pool2.query('SELECT question_id FROM questions WHERE survey_id = $1', [surveyId]);

    const deletePromises = result.rows.map(async row => {
        // Delete all questions
        await pool2.query('DELETE FROM questions WHERE question_id = $1', [row.question_id]);

        const res = await pool2.query('SELECT answer_id FROM answers WHERE question_id = $1', [row.question_id]);
        const deleteUserAnswersPromises = res.rows.map(async r => {
          // Delete all answers given by the users
          return await pool2.query('DELETE FROM users_answers WHERE answer_id = $1', [r.answer_id]); 
        }); 
        await Promise.all(deleteUserAnswersPromises);
        // Delete all answers
        await pool2.query('DELETE FROM answers WHERE question_id = $1', [row.question_id])
    });

    // Delete all entries to save which users finished the survey
    await pool2.query('DELETE FROM users_surveys WHERE survey_id = $1', [surveyId]); 

    await Promise.all(deletePromises);
    return { message: 'Survey and associated questions deleted' }; 
  } catch (err) { 
    throw err; 
  }
};

// Database call to get all questions of a specific survey
const getQuestions = async (survey_id) => {
  try {
    const result = await pool2.query('SELECT * FROM questions WHERE survey_id = $1 AND type <> \'mc matrix sub\'', [survey_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Database call to get all subquestions of a specific question
const getSubquestions = async (question_id) => {
  try {
    const result = await pool2.query('SELECT * FROM questions WHERE head_question_id = $1', [question_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

const saveQuestions = async (survey_id, updatedQuestions) => {
  const client = await pool2.connect();

  try {
    await client.query('BEGIN');

    // Delete the old questions and answers of the survey
    await client.query('DELETE FROM answers WHERE question_id IN (SELECT question_id FROM questions WHERE survey_id = $1)', [survey_id]);
    await client.query('DELETE FROM questions WHERE survey_id = $1', [survey_id]); 
    
    const insertPromises = updatedQuestions.map(async q => {

      if (q.type == 'mc matrix') {
        q.type = 'mc matrix head';
      }

      // Save the new questions
      const result = await client.query('INSERT INTO questions (survey_id, question_text, type) VALUES ($1, $2, $3) RETURNING question_id', [survey_id, q.question_text, q.type]);
      const question_id = result.rows[0].question_id;

      if (q.type == 'mc matrix head') {
        const subquestionPromises = q.subquestions.map(async subquestion => {
          // Save the new subquestion
          const subquestion_result = await client.query('INSERT INTO questions (survey_id, question_text, type, head_question_id) VALUES ($1, $2, \'mc matrix sub\', $3) RETURNING question_id', [survey_id, subquestion.question_text, question_id]);
          const subquestion_id = subquestion_result.rows[0].question_id;
          const answerPromises = q.answers.map(async answer => {
            // Save the new answers
            await client.query('INSERT INTO answers (question_id, answer_text) VALUES ($1, $2)', [subquestion_id, answer.answer_text]);
          });
          await Promise.all(answerPromises);
        });
        await Promise.all(subquestionPromises);
      } else {
        const answerPromises = q.answers.map(async answer => {
          // Save the new answers
          await client.query('INSERT INTO answers (question_id, answer_text) VALUES ($1, $2)', [question_id, answer.answer_text]);
        });
        await Promise.all(answerPromises);
      }
       
      return result.rows[0];
    });

    const savedQuestions = await Promise.all(insertPromises);
    await client.query('COMMIT');
    return savedQuestions;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Database call to get all answers of a specific question
const getAnswers = async (question_id) => {
  try {
    const result = await pool2.query('SELECT answer_id, answer_text FROM answers WHERE question_id = $1', [question_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Database call to get an answer given by an user
const getUserAnswers = async (username, question_id) => {
  try {
    const result = await pool2.query('SELECT answer_id, text FROM users_answers WHERE user_name = $1 AND answer_id IN (SELECT answer_id FROM answers WHERE question_id = $2)', [username, question_id]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

// Database call to change an answer given by an user
const changeUserAnswer = async (username, answerId, answertext, saveText) => {
  const client = await pool2.connect();
  try {
    await client.query('BEGIN');
    const res_questionId = await client.query('SELECT question_id FROM answers WHERE answer_id = $1', [answerId]);
    const question_id = res_questionId.rows[0].question_id;
    const possibleAnswers = await client.query('SELECT answer_id FROM answers WHERE question_id = $1', [question_id]);

    await Promise.all(
      possibleAnswers.rows.map(async (a) => {
        // Delete the previous given answer
        await client.query('DELETE FROM users_answers WHERE user_name = $1 AND answer_id = $2', [username, a.answer_id]);
      })
    );

    // Save the new answer
    if (!saveText){
      await client.query('INSERT INTO users_answers (user_name, answer_id) VALUES ($1, $2)', [username, answerId]);
    } else if (saveText && answertext != null && answertext != '') {
      await client.query('INSERT INTO users_answers (user_name, answer_id, text) VALUES ($1, $2, $3)', [username, answerId, answertext]);
    }

    await client.query('COMMIT');
    return {message: 'Answer changed successfully'}
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

// Database call to save an answer given by an user
const saveUserAnswer = async (username, answerId) => {
  try {
    await pool2.query('INSERT INTO users_answers (user_name, answer_id) VALUES ($1, $2)', [username, answerId]);
    return {message: 'Answer saved successfully'}
  } catch (err) {
    throw err;
  }
};

// Database call to delete an answer given by an user
const deleteUserAnswer = async (username, answerId) => {
  try {
    await pool2.query('DELETE FROM users_answers WHERE user_name = $1 AND answer_id = $2', [username, answerId]);
    return {message: 'Answer deleted successfully'}
  } catch (err) {
    throw err;
  }
};

// Database call to save a finished survey by an user
const saveUserSurvey = async (username, surveyId) => {
  try {
    await pool2.query('INSERT INTO users_surveys (user_name, survey_id) VALUES ($1, $2)', [username, surveyId]);
    return {message: 'Answer saved successfully'}
  } catch (err) {
    throw err;
  }
};

// Endpoint to get all surveys
app.get('/surveys', async (req, res) => {
  try {
    const surveys = await getSurveys();
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to get all active surveys a specific user did not finished
app.get('/surveys/:username/active', async (req, res) => {
  try {
    const { username } = req.params;
    const surveys = await getActiveSurveys(username);
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to get the results of a specific survey
app.get('/surveys/:surveyId/results', async (req, res) => {
  try {
    const {surveyId} = req.params;
    const surveyResults = await getSurveyResults(surveyId);
    res.json(surveyResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to get the number of participants of a specific survey
app.get('/survey-participants/:surveyId', async (req, res) => {
  try {
    const {surveyId} = req.params;
    const numParticipants = await getNumParticipants(surveyId);
    res.json(numParticipants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to add a new survey
app.post('/surveys', async (req, res) => {
  try {
    const { title } = req.body;
    const survey = await addSurvey(title);
    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to change the survey title of a specific survey
app.put('/surveys/:surveyId', async (req, res) => { 
  try { 
    const { surveyId } = req.params; 
    const { title } = req.body;
    const result = await updateSurvey(surveyId, title); 
    res.json(result); 
  } catch (err) { 
    console.error(err.message); 
    res.status(500).send('Server error'); 
  } 
});

// Enpoint to start a specific survey
app.put('/surveys/:surveyId/start', async (req, res) => { 
  try { 
    const { surveyId } = req.params; 
    const result = await startSurvey(surveyId); 
    res.json(result); 
  } catch (err) { 
    console.error(err.message); 
    res.status(500).send('Server error'); 
  } 
});

// Enpoint to stop a specific survey
app.put('/surveys/:surveyId/stop', async (req, res) => { 
  try { 
    const { surveyId } = req.params; 
    const result = await stopSurvey(surveyId); 
    res.json(result); 
  } catch (err) { 
    console.error(err.message); 
    res.status(500).send('Server error'); 
  } 
});

// Enpoint to copy a specific survey
app.post('/surveys/:surveyId/copy', async (req, res) => { 
  try { 
    const { surveyId } = req.params; 
    const result = await copySurvey(surveyId); 
    res.json(result); 
  } catch (err) { 
    console.error(err.message); 
    res.status(500).send('Server error'); 
  } 
});

// Endpoint to delete a specific survey
app.delete('/surveys/:surveyId', async (req, res) => { 
  try { 
    const { surveyId } = req.params; 
    const result = await deleteSurvey(surveyId); 
    res.json(result); 
  } catch (err) { 
    console.error(err.message); 
    res.status(500).send('Server error');
  }
 });

// Endpoint to get all questions of a specific survey
app.get('/questions/:survey_id', async (req, res) => {
  try {
    const { survey_id } = req.params;
    const questions = await getQuestions(survey_id);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to get all subquestions of a specific question
app.get('/subquestions/:question_id', async (req, res) => {
  try {
    const { question_id } = req.params;
    const questions = await getSubquestions(question_id);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to save all questions and answers of a specific survey
app.post('/save-questions', async (req, res) => {
  try {
    const { questions, survey_id } = req.body;
    const result = await saveQuestions(survey_id, questions);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to get all answers of a specific question
app.get('/answers/:question_id', async (req, res) => {
  try {
    const { question_id } = req.params;
    const answers = await getAnswers(question_id);
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to get an answer given by an user
app.get('/user-answers/:username/:questionId', async (req, res) => {
  try {
    const { username, questionId } = req.params;
    const answers = await getUserAnswers(username, questionId);
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to change an answer given by an user
app.post('/change-user-answer', async (req, res) => {
  try {
    const { username, answerId, answertext, saveText } = req.body;
    const answers = await changeUserAnswer(username, answerId, answertext, saveText);
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to save an answer given by an user
app.post('/save-user-answer', async (req, res) => {
  try {
    const { username, answerId } = req.body;
    const answers = await saveUserAnswer(username, answerId);
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to delete an answer given by an user
app.delete('/delete-user-answer', async (req, res) => {
  try {
    const { username, answerId } = req.body;
    const answers = await deleteUserAnswer(username, answerId);
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Endpoint to save a finished survey by an user
app.post('/save-user-survey', async (req, res) => {
  try {
    const { username, surveyId } = req.body;
    const answers = await saveUserSurvey(username, surveyId);
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


//################# tests ######################################################
/* app.post('/api/feedback', async (req, res) => {
  const { question, studentAnswer, model = 'mistral' } = req.body;

  const prompt = `
Question: ${question}
Student Answer: "${studentAnswer}"

You are a helpful tutor. Provide clear, constructive feedback that helps the student understand their mistake and how to improve their answer. The students have to find the correct query themself, so do provide only a hint in your output without a solution query. Also limit your output to 300 characters.
`;

  try {
    const response = await axios.post('http://localhost:11434/api/chat', {
      model,
      messages: [{ role: 'user', content: prompt }],
      stream: false
    });

    res.json({ feedback: response.data.message.content.trim() });
  } catch (error) {
    console.error('Error from Ollama:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get feedback from Ollama' });
  }
}); */





//################# start server ######################################################
app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});

