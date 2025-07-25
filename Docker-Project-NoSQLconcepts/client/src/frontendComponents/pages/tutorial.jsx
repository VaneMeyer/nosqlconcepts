import React from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import {
  
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  
} from "@mui/material";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-sql"; // SQL-Syntax-Highlighting
//import "../../custom_ace_files/mode-cql";
import "../../custom_ace_files/mode-cypher";
import "../../custom_ace_files/mode-mongodb";
import "../../custom_ace_files/mode-pgsql";
import "../../custom_ace_files/theme-goethe";
import Quiz from "../components/tutorialComponents/sqlQuiz";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// Accessibility-friendly a11yProps function
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function DatabaseTutorials() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Example usage:
  const questions = [
    {
      question: "What is an Equi Join in SQL?",
      options: [
        "A join that uses comparison operators like <, >",
        "A join that uses only equality (=) conditions",
        "A join that connects tables without conditions",
        "A self-join",
      ],
      correctAnswer: "A join that uses only equality (=) conditions",
    },
    {
      question:
        "Which SQL keyword is used to join tables based on a condition?",
      options: ["ON", "WHERE", "JOIN", "UNION"],
      correctAnswer: "JOIN",
    },
    {
      question: "What is a Theta Join?",
      options: [
        "A join that connects tables based on equality conditions only",
        "A join that uses any comparison operator (e.g., <, >, !=)",
        "A join that merges tables without conditions",
        "A join specific to PostgreSQL",
      ],
      correctAnswer:
        "A join that uses any comparison operator (e.g., <, >, !=)",
    },
    {
      question:
        "How do you add a new column to an existing table in PostgreSQL?",
      options: [
        "ADD COLUMN new_column_name",
        "ALTER TABLE table_name ADD COLUMN column_name",
        "CREATE COLUMN new_column_name",
        "UPDATE COLUMN new_column_name",
      ],
      correctAnswer: "ALTER TABLE table_name ADD COLUMN column_name",
    },
    {
      question: "How does PostgreSQL handle missing values?",
      options: [
        "It replaces them with 0",
        "It throws an error when queried",
        "It represents them as NULL",
        "It skips them during query execution",
      ],
      correctAnswer: "It represents them as NULL",
    },
    {
      question:
        "Which SQL function can replace NULL values with a default value?",
      options: ["IFNULL()", "ISNULL()", "COALESCE()", "NULLIF()"],
      correctAnswer: "COALESCE()",
    },
    {
      question:
        "What does the following query do? SELECT * FROM employees WHERE department_id BETWEEN 1 AND 5;",
      options: [
        "Selects employees whose department_id is equal to 1 or 5",
        "Selects employees whose department_id is not between 1 and 5",
        "Selects employees whose department_id is in the range of 1 to 5, inclusive",
        "Selects all employees",
      ],
      correctAnswer:
        "Selects employees whose department_id is in the range of 1 to 5, inclusive",
    },
    {
      question: "What is the purpose of an index in PostgreSQL?",
      options: [
        "To create a copy of the table",
        "To speed up data retrieval operations",
        "To store metadata about the table",
        "To handle NULL values in queries",
      ],
      correctAnswer: "To speed up data retrieval operations",
    },
    {
      question:
        "Which PostgreSQL feature allows querying hierarchical data like a tree structure?",
      options: ["Window Functions", "Recursive CTEs", "Joins", "Subqueries"],
      correctAnswer: "Recursive CTEs",
    },
    {
      question: "What is the purpose of the pgRouting extension in PostgreSQL?",
      options: [
        "To analyze geographic data",
        "To perform network and routing analysis",
        "To manage schemas dynamically",
        "To index large datasets",
      ],
      correctAnswer: "To perform network and routing analysis",
    },
  ];

  const cas_questions = [
    {
      question: "What is Cassandra best known for?",
      options: [
        "Relational database management",
        "Handling distributed, scalable data across multiple nodes",
        "Supporting advanced SQL features like joins and triggers",
        "Offering built-in graph database functionality",
      ],
      correctAnswer:
        "Handling distributed, scalable data across multiple nodes",
    },
    {
      question: "How does Cassandra handle joins?",
      options: [
        "Cassandra natively supports joins like SQL",
        "Joins must be emulated through denormalization or external tools",
        "Joins are performed using materialized views",
        "Joins are not needed in Cassandra because all data is stored in one table",
      ],
      correctAnswer:
        "Joins must be emulated through denormalization or external tools",
    },
    {
      question: "What is the primary purpose of denormalization in Cassandra?",
      options: [
        "To normalize data across multiple tables",
        "To improve query performance by avoiding joins",
        "To reduce disk space usage",
        "To enforce referential integrity",
      ],
      correctAnswer: "To improve query performance by avoiding joins",
    },
    {
      question:
        "How can you add a new column to an existing table in Cassandra?",
      options: [
        "ALTER TABLE table_name ADD COLUMN column_name",
        "ALTER TABLE table_name ADD column_name",
        "ALTER table_name ADD COLUMN column_name",
        "CREATE COLUMN table_name.column_name",
      ],
      correctAnswer: "ALTER TABLE table_name ADD COLUMN column_name",
    },
    {
      question: "How does Cassandra represent missing values?",
      options: [
        'With the string "MISSING"',
        "With a default value of 0",
        "As NULL",
        "Missing values are not allowed in Cassandra",
      ],
      correctAnswer: "As NULL",
    },
    {
      question:
        "Which of the following is true about range queries in Cassandra?",
      options: [
        "Range queries can span across multiple partitions",
        "Range queries are only allowed on clustering columns within a single partition",
        "Range queries are not supported in Cassandra",
        "Range queries must always include a secondary index",
      ],
      correctAnswer:
        "Range queries are only allowed on clustering columns within a single partition",
    },
    {
      question:
        'What does the following CQL query do? SELECT * FROM sales WHERE product_id = uuid() AND sale_date >= "2023-01-01";',
      options: [
        "Queries all rows across all partitions",
        "Queries rows within the partition identified by product_id where sale_date is after 2023-01-01",
        "Performs a full table scan for matching rows",
        "Creates a new table for the query results",
      ],
      correctAnswer:
        "Queries rows within the partition identified by product_id where sale_date is after 2023-01-01",
    },
    {
      question: "What is the purpose of the pgRouting equivalent in Cassandra?",
      options: [
        "Cassandra has built-in support for routing analysis",
        "Use JanusGraph with Cassandra for network and routing analysis",
        "Use secondary indexes to analyze routes in Cassandra",
        "Cassandra cannot handle network analysis",
      ],
      correctAnswer:
        "Use JanusGraph with Cassandra for network and routing analysis",
    },
    {
      question: "Which CQL statement is used to remove a column from a table?",
      options: [
        "ALTER TABLE table_name REMOVE COLUMN column_name",
        "ALTER TABLE table_name DROP column_name",
        "DROP COLUMN column_name FROM table_name",
        "Cassandra does not allow removing columns",
      ],
      correctAnswer: "ALTER TABLE table_name DROP column_name",
    },
    {
      question:
        "What is the key limitation of Cassandra compared to relational databases?",
      options: [
        "Lack of scalability",
        "Limited support for joins and transactions",
        "Inability to handle large datasets",
        "Single point of failure",
      ],
      correctAnswer: "Limited support for joins and transactions",
    },
  ];

  const neo_questions = [
    {
      question: "What is Neo4j best suited for?",
      options: [
        "Relational data modeling",
        "Handling graph-based data with complex relationships",
        "Storing unstructured binary data",
        "Data warehousing",
      ],
      correctAnswer: "Handling graph-based data with complex relationships",
    },
    {
      question: "How do you perform an Equi Join in Neo4j?",
      options: [
        "Using the JOIN keyword",
        "Using MATCH to traverse relationships between nodes",
        "Using WHERE with equality conditions",
        "Neo4j does not support joins",
      ],
      correctAnswer: "Using MATCH to traverse relationships between nodes",
    },
    {
      question: "What is a Theta Join in Neo4j?",
      options: [
        "A join with conditions other than equality",
        "A special type of graph traversal",
        "A built-in Neo4j feature",
        "A join performed with secondary indexes",
      ],
      correctAnswer: "A join with conditions other than equality",
    },
    {
      question: "How can you evolve a schema in Neo4j?",
      options: [
        "By using ALTER TABLE commands",
        "By adding properties or relationships dynamically",
        "By recompiling the database schema",
        "Neo4j does not support schema evolution",
      ],
      correctAnswer: "By adding properties or relationships dynamically",
    },
    {
      question: "How does Neo4j handle missing values?",
      options: [
        "By storing NULL explicitly",
        "By skipping properties that do not exist",
        "By assigning a default value of 0",
        "Missing values are not allowed",
      ],
      correctAnswer: "By skipping properties that do not exist",
    },
    {
      question: "Which Cypher function can handle missing values?",
      options: ["COALESCE", "ISNULL", "IFNULL", "DEFAULT"],
      correctAnswer: "COALESCE",
    },
    {
      question: "How are range queries implemented in Neo4j?",
      options: [
        "Using RANGE() function",
        "Using comparison operators in WHERE clause",
        "Using the BETWEEN operator",
        "Range queries are not supported",
      ],
      correctAnswer: "Using comparison operators in WHERE clause",
    },
    {
      question: "How do you find the shortest path between two nodes in Neo4j?",
      options: [
        "Using SHORTEST() function",
        "Using MATCH with shortestPath()",
        "Using Dijkstra’s algorithm manually",
        "Neo4j does not support shortest paths",
      ],
      correctAnswer: "Using MATCH with shortestPath()",
    },
    {
      question: "What is the primary advantage of Neo4j for network analysis?",
      options: [
        "It uses relational modeling",
        "It provides built-in graph algorithms",
        "It scales better than all other databases",
        "It has native support for machine learning",
      ],
      correctAnswer: "It provides built-in graph algorithms",
    },
    {
      question:
        "What does the following Cypher query do? MATCH (a:Person)-[:KNOWS]->(b:Person) RETURN a, b;",
      options: [
        "Finds all people and their relationships",
        "Finds all people who know each other",
        "Finds people without relationships",
        "Finds disconnected nodes",
      ],
      correctAnswer: "Finds all people who know each other",
    },
  ];
  const mongo_questions = [
    {
      question: 'What is MongoDB best suited for?',
      options: [
        'Relational data modeling',
        'Handling JSON-like, unstructured data',
        'Data warehousing',
        'Graph-based data with complex relationships',
      ],
      correctAnswer: 'Handling JSON-like, unstructured data',
    },
    {
      question: 'How do you perform an Equi Join in MongoDB?',
      options: [
        'Using JOIN in the find() method',
        'Using the $lookup stage in the aggregation pipeline',
        'Using WHERE with equality conditions',
        'MongoDB does not support joins',
      ],
      correctAnswer: 'Using the $lookup stage in the aggregation pipeline',
    },
    {
      question: 'What is a Theta Join in MongoDB?',
      options: [
        'A join with conditions other than equality',
        'A MongoDB-native feature for handling complex joins',
        'A special aggregation pipeline stage',
        'MongoDB does not support Theta Joins',
      ],
      correctAnswer: 'A join with conditions other than equality',
    },
    {
      question: 'How can you evolve a schema in MongoDB?',
      options: [
        'By using ALTER TABLE commands',
        'By dynamically adding or modifying fields in documents',
        'By recompiling the database schema',
        'MongoDB does not support schema evolution',
      ],
      correctAnswer: 'By dynamically adding or modifying fields in documents',
    },
    {
      question: 'How does MongoDB handle missing fields in documents?',
      options: [
        'By storing NULL explicitly',
        'By skipping the fields in the document',
        'By assigning a default value of 0',
        'Missing fields are not allowed',
      ],
      correctAnswer: 'By skipping the fields in the document',
    },
    {
      question: 'Which MQL operator is used to handle missing values?',
      options: [
        '$COALESCE',
        '$IFNULL',
        '$ifNull',
        '$exists',
      ],
      correctAnswer: '$ifNull',
    },
    {
      question: 'How are range queries implemented in MongoDB?',
      options: [
        'Using the RANGE() function',
        'Using comparison operators such as $gte and $lte',
        'Using the BETWEEN operator',
        'Range queries are not supported',
      ],
      correctAnswer: 'Using comparison operators such as $gte and $lte',
    },
    {
      question: 'Which operator is used for network analysis in MongoDB?',
      options: [
        '$graphLookup',
        '$networkSearch',
        '$traverse',
        '$shortestPath',
      ],
      correctAnswer: '$graphLookup',
    },
    {
      question: 'What does the $lookup stage do in MongoDB?',
      options: [
        'Performs a join between two collections',
        'Indexes a collection for faster lookups',
        'Creates a backup of the database',
        'Filters documents based on conditions',
      ],
      correctAnswer: 'Performs a join between two collections',
    },
    {
      question: 'How can you create an index in MongoDB?',
      options: [
        'Using the $createIndex command',
        'Using the createIndex() method',
        'By defining the schema',
        'Indexes are not supported in MongoDB',
      ],
      correctAnswer: 'Using the createIndex() method',
    },
  ];
  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Database Tutorials Tabs"
        >
          <Tab label="PostgreSQL" {...a11yProps(0)} />
          <Tab label="Cassandra" {...a11yProps(1)} />
          <Tab label="Neo4J" {...a11yProps(2)} />
          <Tab label="MongoDB" {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Typography variant="h4">PostgreSQL Tutorial</Typography>
          <Typography paragraph>
            PostgreSQL is a powerful, object-relational database management
            system (ORDBMS). It supports SQL and offers advanced features such
            as extended joins, custom data types, functions, and strong
            community support.
          </Typography>
          <div>
            <Typography variant="h5">Equi Join</Typography>
            <Typography paragraph>
              An Equi Join connects tables based on an equality condition. It is
              the most common type of join.
            </Typography>
            <Typography paragraph>
              Example: Assume we have two tables:
            </Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    department_id INT
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO employees (name, department_id) VALUES
('Alice', 1), ('Bob', 2), ('Charlie', 1);

INSERT INTO departments (name) VALUES
('HR'), ('Engineering');`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "350px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Equi Join Syntax:</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`SELECT e.name AS employee_name, d.name AS department_name
FROM employees e
JOIN departments d
ON e.department_id = d.id;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "100px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Result:</Typography>
            <TableContainer>
              <Table aria-label="tutorial result table">
                <TableHead>
                  <TableRow>
                    <TableCell>employee_name</TableCell>
                    <TableCell>department_name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice</TableCell>
                    <TableCell>HR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob</TableCell>
                    <TableCell>Engineering</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Charlie</TableCell>
                    <TableCell>HR</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <hr></hr>
            <Typography variant="h5">Theta Join</Typography>
            <Typography paragraph>
              A Theta Join is a join that uses any comparison operator (e.g.,{" "}
              {`<, >, <=, >=, !=`}).
            </Typography>
            <Typography paragraph>
              Example: Suppose we want to join employees based on the condition
              that their department_id is less than the id of the department:
            </Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`SELECT e.name AS employee_name, d.name AS department_name
FROM employees e
JOIN departments d
ON e.department_id < d.id;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "100px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Result:</Typography>
            <TableContainer>
              <Table aria-label="tutorial result table">
                <TableHead>
                  <TableRow>
                    <TableCell>employee_name</TableCell>
                    <TableCell>department_name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice</TableCell>
                    <TableCell>Engineering</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Charlie</TableCell>
                    <TableCell>Engineering</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <hr></hr>
            <Typography variant="h5">Schema Evolution</Typography>
            <Typography paragraph>
              Schema Evolution refers to the ability to change a database schema
              without disrupting existing functionality.
            </Typography>
            <Typography paragraph>Adding a Column:</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`ALTER TABLE employees ADD COLUMN email VARCHAR(100);`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Modifying a Data Type:</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`ALTER TABLE employees ALTER COLUMN email TYPE TEXT;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Removing a Column:</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`ALTER TABLE employees DROP COLUMN email;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Adding an Index:</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`CREATE INDEX idx_department_id ON employees(department_id);`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <hr></hr>
            <Typography variant="h5">Missing Values</Typography>
            <Typography paragraph>
              PostgreSQL treats missing values as NULL.
            </Typography>
            <Typography paragraph>Examples</Typography>
            <Typography paragraph>
              Filtering Columns with NULL Values:
            </Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`SELECT * FROM employees WHERE email IS NULL;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>
              Replacing NULL Values with a Default:
            </Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`SELECT COALESCE(email, 'no_email@domain.com') AS email_address FROM employees;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Counting NULL Values</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`SELECT COUNT(*) AS null_count
FROM employees
WHERE email IS NULL;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "100px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <hr></hr>
            <Typography variant="h5">Range Queries</Typography>
            <Typography paragraph>
              Range Queries filter records based on a range.
            </Typography>
            <Typography paragraph>Examples</Typography>
            <Typography paragraph>Simple Range</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`SELECT * FROM employees WHERE department_id BETWEEN 1 AND 2;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Using Timestamps</Typography>
            <Typography paragraph>Assume we add a creation date:</Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`ALTER TABLE employees ADD COLUMN created_at TIMESTAMP DEFAULT NOW();

SELECT * FROM employees
WHERE created_at BETWEEN '2023-01-01' AND '2023-12-31';`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "100px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>
              Adding an Index for Better Performance
            </Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`CREATE INDEX idx_created_at ON employees(created_at);`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "50px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <hr></hr>
            <Typography variant="h5">Network Analysis</Typography>
            <Typography paragraph>
              Network analysis in PostgreSQL can be performed using extensions
              like pgRouting or recursive queries.
            </Typography>
            <Typography paragraph>Example of Recursive Queries</Typography>
            <Typography paragraph>
              Suppose we have a table representing a hierarchy of managers and
              employees:
            </Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`CREATE TABLE hierarchy (
    employee_id INT,
    manager_id INT
);

INSERT INTO hierarchy VALUES
(1, NULL), (2, 1), (3, 1), (4, 2), (5, 3);`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "150px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>
              Recursive CTE (Common Table Expression):
            </Typography>
            <AceEditor
              id="query-input-label"
              name="query"
              mode="sql"
              value={`WITH RECURSIVE employee_tree AS (
    SELECT employee_id, manager_id, 1 AS level
    FROM hierarchy
    WHERE manager_id IS NULL
    UNION ALL
    SELECT h.employee_id, h.manager_id, et.level + 1
    FROM hierarchy h
    JOIN employee_tree et
    ON h.manager_id = et.employee_id
)
SELECT * FROM employee_tree;`}
              editorProps={{ $blockScrolling: true }}
              style={{ width: "100%", height: "230px" }}
              setOptions={{ fontSize: "16px" }}
            />
            <Typography paragraph>Result:</Typography>
            <TableContainer>
              <Table aria-label="tutorial result table">
                <TableHead>
                  <TableRow>
                    <TableCell>employee_id</TableCell>
                    <TableCell>manager_id</TableCell>
                    <TableCell>level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>NULL</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>3</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <hr></hr>
            <Quiz
              questionData={questions}
              onSubmit={(score) => console.log(`Final Score: ${score}`)}
            />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h4">Cassandra Tutorial</Typography>
          <Typography paragraph>
            Apache Cassandra is a highly scalable, distributed NoSQL database
            designed to handle large amounts of data across many commodity
            servers without a single point of failure. Cassandra Query Language
            (CQL) is its query language, resembling SQL but optimized for
            Cassandra's distributed architecture.
          </Typography>

          <Typography variant="h5">Equi Join in Cassandra</Typography>
          <Typography paragraph>
            Unlike relational databases, Cassandra doesn’t support joins
            natively. However, you can emulate an Equi Join by denormalizing
            your data. This involves storing related data in the same table or
            creating materialized views.
          </Typography>
          <Typography paragraph>Example:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`CREATE TABLE employees (
    employee_id UUID PRIMARY KEY,
    name TEXT,
    department_id UUID
);

CREATE TABLE departments (
    department_id UUID PRIMARY KEY,
    department_name TEXT
);

-- To "join" these, you denormalize:
CREATE TABLE employee_departments (
    employee_id UUID PRIMARY KEY,
    name TEXT,
    department_name TEXT
);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "330px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            You precompute the relationship and store it in
            employee_departments.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Theta Join in Cassandra</Typography>
          <Typography paragraph>
            Cassandra doesn’t support advanced joins like Theta Joins. To
            achieve this, you must preprocess the data or use external tools
            (e.g., Spark). Alternatively, denormalize and filter at the
            application level.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Schema Evolution in Cassandra</Typography>
          <Typography paragraph>
            Cassandra allows schema evolution by enabling you to alter tables
            without downtime. However, schema changes should be approached
            cautiously, as they can affect performance.
          </Typography>
          <Typography paragraph>Adding a Column:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`ALTER TABLE employees ADD email TEXT;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>Dropping a Column:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`ALTER TABLE employees DROP email;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Renaming a Column: Cassandra doesn’t support renaming columns
            directly. Instead, create a new column, migrate data, and drop the
            old column.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Handling Missing Values</Typography>
          <Typography paragraph>
            Cassandra represents missing values as NULL. However, it's
            recommended to avoid storing NULL values due to performance
            implications. Use default values where possible.
          </Typography>
          <Typography paragraph>Example:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`INSERT INTO employees (employee_id, name, department_id) VALUES (uuid(), 'Alice', null);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>You can filter for missing values:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`SELECT * FROM employees WHERE department_id IS NULL;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <hr></hr>
          <Typography variant="h5">Range Queries</Typography>
          <Typography paragraph>
            Cassandra supports range queries, but they are limited to clustering
            columns within a single partition. This is due to its distributed
            nature and the need to avoid full table scans.
          </Typography>
          <Typography paragraph>Example Table:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`CREATE TABLE sales (
    product_id UUID,
    sale_date DATE,
    amount DECIMAL,
    PRIMARY KEY (product_id, sale_date)
);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "150px" }}
            setOptions={{ fontSize: "16px" }}
          />

          <Typography paragraph>Range Query:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`SELECT * FROM sales WHERE product_id = uuid() AND sale_date >= '2023-01-01' AND sale_date <= '2023-12-31';`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />

          <Typography paragraph>
            Range queries must include the partition key (product_id in this
            case).
          </Typography>
          <hr></hr>
          <Typography variant="h5">Network Analysis</Typography>
          <Typography paragraph>
            Cassandra can store and query graph-like data for network analysis.
            While it doesn’t have native graph features, it integrates with
            tools like JanusGraph for advanced graph analytics.
          </Typography>
          <Typography paragraph>Example of Storing Graph Data:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`CREATE TABLE network (
    source_node UUID,
    destination_node UUID,
    weight INT,
    PRIMARY KEY (source_node, destination_node)
);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "150px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Query Example: Find all connections from a specific node:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="sql"
            value={`SELECT * FROM network WHERE source_node = uuid();`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <hr></hr>
          <Quiz
            questionData={cas_questions}
            onSubmit={(score) => console.log(`Final Score: ${score}`)}
          />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h4">Neo4J Tutorial</Typography>
          <Typography paragraph>
            Neo4j is a graph database designed for managing connected data.
            Unlike relational databases, it uses nodes, relationships, and
            properties to represent and store data. Cypher is Neo4j's query
            language, designed to efficiently query graph data using an
            intuitive and expressive syntax.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Equi Join</Typography>
          <Typography paragraph>
            In Neo4j, an Equi Join is implicit when traversing relationships
            between nodes. You can use pattern matching in Cypher to "join"
            nodes by their relationships.
          </Typography>
          <Typography paragraph>
            Example: Suppose you have nodes for Employee and Department
            connected by an :ASSIGNED_TO relationship.
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH (e:Employee)-[:ASSIGNED_TO]->(d:Department)
RETURN e.name, d.name;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            This query fetches all employees and their corresponding
            departments, mimicking an Equi Join.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Theta Join</Typography>
          <Typography paragraph>
            A Theta Join involves filtering results based on conditions other
            than equality. In Neo4j, you can add additional constraints in the
            WHERE clause.
          </Typography>
          <Typography paragraph>
            Example: Retrieve employees and departments where the department
            budget exceeds a certain threshold.
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH (e:Employee)-[:ASSIGNED_TO]->(d:Department)
WHERE d.budget > 100000
RETURN e.name, d.name, d.budget;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "100px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Here, the WHERE clause implements the theta condition (d.budget{" "}
            {`>`} 100000).
          </Typography>
          <hr></hr>
          <Typography variant="h5">Schema Evolution</Typography>
          <Typography paragraph>
            Neo4j is schema-optional, meaning you can evolve your data model
            dynamically without strict schemas. However, you can define
            constraints and indexes to enforce some structure.
          </Typography>
          <Typography paragraph>
            Adding a New Property: You can add properties to nodes or
            relationships dynamically:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH (e:Employee {name: 'Alice'})
SET e.email = 'alice@example.com';`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Adding a Constraint: To enforce a unique constraint:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`CREATE CONSTRAINT FOR (e:Employee) REQUIRE e.employeeId IS UNIQUE;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <hr></hr>
          <Typography variant="h5">Handling Missing Values</Typography>
          <Typography paragraph>
            Neo4j handles missing values implicitly. If a property does not
            exist, Cypher evaluates it as NULL.
          </Typography>
          <Typography paragraph>Checking for Missing Values:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH (e:Employee)
WHERE e.email IS NULL
RETURN e.name;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "100px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Setting Default Values: You can use the COALESCE function to handle
            missing values:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH (e:Employee)
RETURN e.name, COALESCE(e.email, 'No Email') AS email;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <hr></hr>
          <Typography variant="h5">Range Queries</Typography>
          <Typography paragraph>
            Neo4j supports range queries on numeric or date properties using
            comparison operators.
          </Typography>
          <Typography paragraph>
            Example: Find all employees hired between two dates.
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH (e:Employee)
WHERE e.hireDate >= date('2023-01-01') AND e.hireDate <= date('2023-12-31')
RETURN e.name, e.hireDate;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "100px" }}
            setOptions={{ fontSize: "16px" }}
          />

          <hr></hr>
          <Typography variant="h5">Network Analysis</Typography>
          <Typography paragraph>
            Neo4j excels in network analysis due to its graph-first approach.
            Common tasks include finding shortest paths, community detection,
            and centrality analysis.
          </Typography>
          <Typography paragraph>
            Shortest Path: Find the shortest path between two nodes:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH p=shortestPath((a:Person {name: 'Alice'})-[:KNOWS*]-(b:Person {name: 'Bob'}))
RETURN p;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "100px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Community Detection: Use Neo4j's graph algorithms library for
            advanced analysis:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`CALL gds.louvain.stream({
  nodeProjection: 'Person',
  relationshipProjection: 'KNOWS',
  relationshipProperties: 'weight'
})
YIELD nodeId, communityId
RETURN gds.util.asNode(nodeId).name AS person, communityId;`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "150px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <hr></hr>
          <Typography variant="h5">Practical Considerations</Typography>
          <Typography paragraph>
            Indexes: Use indexes to speed up lookups for specific properties.
          </Typography>

          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`CREATE INDEX FOR (e:Employee) ON (e.name);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Relationship Direction: Neo4j relationships are directional. Always
            specify the direction unless you want to traverse both ways.
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="cypher"
            value={`MATCH (a)-[r:RELATIONSHIP_TYPE]->(b)`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Graph Algorithms: Leverage Neo4j's Graph Data Science library for
            deeper insights.
          </Typography>
          <hr></hr>
          <Quiz
            questionData={neo_questions}
            onSubmit={(score) => console.log(`Final Score: ${score}`)}
          />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Typography variant="h4">MongoDB Tutorial</Typography>
          <Typography paragraph>
            MongoDB is a NoSQL database that stores data in flexible, JSON-like
            documents. MQL (MongoDB Query Language) is used to query, update,
            and manage data in MongoDB. It provides powerful operators and
            aggregation pipelines to handle complex queries.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Equi Join</Typography>
          <Typography paragraph>
            MongoDB doesn’t have traditional joins like relational databases.
            Instead, you use the $lookup stage in the aggregation pipeline to
            perform an Equi Join.
          </Typography>
          <Typography paragraph>
            Example: Join employees with their departments collection on a
            matching departmentId.
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.aggregate([
  {
    $lookup: {
      from: "departments",
      localField: "departmentId",
      foreignField: "_id",
      as: "departmentDetails",
    },
  },
]);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "230px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            This query adds a departmentDetails array to each employee document,
            containing matching departments.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Theta Join</Typography>
          <Typography paragraph>
            A Theta Join can be implemented by combining $lookup with a $match
            stage for custom conditions.
          </Typography>
          <Typography paragraph>
            Example: Join employees with departments where the department budget
            exceeds $100,000.
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.aggregate([
  {
    $lookup: {
      from: "departments",
      let: { deptId: "$departmentId" },
      pipeline: [
        { $match: { $expr: { $and: [{ $eq: ["$_id", "$$deptId"] }, { $gt: ["$budget", 100000] }] } } },
      ],
      as: "departmentDetails",
    },
  },
]);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "230px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            The $expr operator allows complex conditions in the $match stage.
          </Typography>
          <hr></hr>
          <Typography variant="h5">Schema Evolution</Typography>
          <Typography paragraph>
            MongoDB’s flexible schema allows you to modify documents
            dynamically. You can add, update, or remove fields without affecting
            other documents.
          </Typography>
          <Typography paragraph>Adding a New Field:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.updateMany({}, { $set: { email: null } });`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>Renaming a Field:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.updateMany({}, { $rename: { "oldFieldName": "newFieldName" } });`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>Removing a Field:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.updateMany({}, { $unset: { obsoleteField: "" } });`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />

          <hr></hr>
          <Typography variant="h5">Handling Missing Values</Typography>
          <Typography paragraph>
            MongoDB handles missing fields naturally by omitting them from
            documents. You can detect missing values using the $exists operator.
          </Typography>
          <Typography paragraph>Checking for Missing Values:</Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.find({ email: { $exists: false } });`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "50px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            Setting Default Values: You can use the $ifNull operator in
            aggregation to replace missing values with a default:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.aggregate([
  {
    $project: {
      name: 1,
      email: { $ifNull: ["$email", "No Email Provided"] },
    },
  },
]);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "160px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <hr></hr>
          <Typography variant="h5">Range Queries</Typography>
          <Typography paragraph>
            MongoDB supports range queries using comparison operators such as
            $gt, $lt, $gte, and $lte.
          </Typography>
          <Typography paragraph>
            Example: Find employees hired between two dates:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.find({
  hireDate: { $gte: new Date("2023-01-01"), $lte: new Date("2023-12-31") },
});`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "100px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography variant="h5">Network Analysis</Typography>
          <Typography paragraph>
            MongoDB is not natively designed for graph-based network analysis,
            but you can model relationships using embedded documents or
            references. Complex graph queries can be performed using the
            $graphLookup operator.
          </Typography>
          <Typography paragraph>
            Example: Find all subordinates of a manager in a hierarchical
            structure:
          </Typography>
          <AceEditor
            id="query-input-label"
            name="query"
            mode="mongodb"
            value={`db.employees.aggregate([
  {
    $graphLookup: {
      from: "employees",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "managerId",
      as: "subordinates",
    },
  },
]);`}
            editorProps={{ $blockScrolling: true }}
            style={{ width: "100%", height: "250px" }}
            setOptions={{ fontSize: "16px" }}
          />
          <Typography paragraph>
            This query traverses a hierarchy of employees based on the managerId
            field.
          </Typography>
          <hr></hr>
          <Quiz questionData={mongo_questions} onSubmit={(score) => console.log(`Final Score: ${score}`)} />

        </TabPanel>
      </Box>
    </Container>
  );
}
