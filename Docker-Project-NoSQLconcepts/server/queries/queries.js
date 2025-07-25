const queries = {
    loginQuery: `SELECT * FROM private.users WHERE user_name = $1 AND password = $2;`, 
    getUsersQuery: `SELECT DISTINCT username FROM tool.user_task_data`,
    getUserDataQuery: `SELECT * FROM tool.user_task_data WHERE username = $1 order by task_area_id, statement_id`,
    getSolutionQuery: `SELECT solution_query FROM tool.task_statements WHERE statement_id = $1 AND area_id = $2`,
    getBackupDataQuery: `SELECT task_area_id as taskAreaId, statement_id as taskNumber,  query_text as queryText, is_executable as isExecutable, result_size as resultSize, partial_solution as partialsolution, is_correct as isCorrect, difficulty_level as difficulty, processing_time as time 
    FROM tool.user_task_data
    WHERE username = $1 order by taskAreaId, taskNumber`,
    storeHistoryDataQuery: `INSERT INTO tool.query_history (
        username,
        statement_id,
        task_area_id,
        query_text,
        is_executable,
        result_size,
        is_correct
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      getHistoryQuery: ` SELECT query_text, executed_at FROM tool.query_history WHERE username = $1 AND task_area_id = $2`,
solvedTaskCountQuery: `SELECT 
task_area_id,
ROUND(AVG(solved_tasks_count)) AS started_tasks_count,
ROUND(AVG(correct_tasks_count)) AS correct_tasks_count,
ROUND(AVG(executable_tasks_count)) AS executable_tasks_count
FROM (
  SELECT 
      task_area_id,
      COUNT(data_id) AS solved_tasks_count,
      SUM(CASE WHEN is_correct = 'Yes' THEN 1 ELSE 0 END) AS correct_tasks_count,
      SUM(CASE WHEN is_executable = 'Yes' THEN 1 ELSE 0 END) AS executable_tasks_count
  FROM tool.user_task_data
  GROUP BY task_area_id, username
) AS subquery
GROUP BY task_area_id;`,
userSolvedTaskCountQuery:` SELECT 
username,
task_area_id,
COUNT(data_id) AS started_tasks_count,
SUM(CASE WHEN is_correct = 'Yes' THEN 1 ELSE 0 END) AS correct_tasks_count,
SUM(CASE WHEN is_executable = 'Yes' THEN 1 ELSE 0 END) AS executable_tasks_count
FROM tool.user_task_data
WHERE username = $1
GROUP BY task_area_id, username;`,
avgProcessingTimeQuery: `SELECT 
task_area_id,
AVG(processing_time) AS avg_processing_time
FROM 
tool.user_task_data
GROUP BY 
task_area_id
ORDER BY 
task_area_id;`,
userAvgProcessingTimeQuery: `SELECT 
username, 
AVG(processing_time) AS avg_processing_time, 
task_area_id
FROM 
tool.user_task_data
WHERE 
username = $1
GROUP BY 
username, 
task_area_id
ORDER BY 
task_area_id;`,
difficultyLevelQuery: `SELECT 
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
        tool.user_task_data
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
difficulty_level;`,
totalUsersQuery: ` SELECT 
COUNT(DISTINCT username) AS total_users
FROM 
tool.user_task_data;`,
historyLineChartQuery: `SELECT 
DATE(executed_at) AS x,
COUNT(*) AS y
FROM 
tool.query_history
WHERE 
username = $1
GROUP BY 
DATE(executed_at),
username
ORDER BY 
x DESC, 
username
LIMIT $2;`,
getTaskFormDataQuery: `SELECT 
*
FROM 
tool.user_task_data
WHERE 
username = $1
AND 
statement_id = $2
AND 
task_area_id = $3;`,
getPgStructureQuery:`SELECT 
c.table_name, 
c.column_name, 
c.udt_name,
c.character_maximum_length,
foreign_constraints.foreign_table_name,
foreign_constraints.foreign_column_name
FROM 
information_schema.columns as c
LEFT OUTER JOIN 
(SELECT
 kcu.table_name, 
 kcu.column_name, 
 ccu.table_name AS foreign_table_name,
 ccu.column_name AS foreign_column_name 
 FROM information_schema.table_constraints AS tc 
 JOIN information_schema.key_column_usage AS kcu
     ON tc.constraint_name = kcu.constraint_name
     AND tc.table_schema = kcu.table_schema
 JOIN information_schema.constraint_column_usage AS ccu
     ON ccu.constraint_name = tc.constraint_name
 WHERE tc.constraint_type = 'FOREIGN KEY'
) as foreign_constraints
ON foreign_constraints.table_name = c.table_name
AND foreign_constraints.column_name = c.column_name
WHERE 
c.table_schema = 'email';`,
handleDataStorageReadQuery: `SELECT * FROM $1 WHERE username = $2 AND statement_id = $3 AND task_area_id = $4;`,
handleDataStorageUpdateQuery:` UPDATE $11 SET 
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
AND task_area_id = $3;`,
handleDataStorageInsertQuery: `INSERT INTO $11 (
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
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
getTasksQuery: `SELECT tasknumber, topic, subtasknumber, maxtime, statement_text as description, hint FROM tool.task_statements WHERE area_id = $1 order by statement_id;`,
getDataFromDBQuery: `SELECT is_correct as isCorrect, partial_solution as partialSolution, difficulty_level as difficulty FROM tool.user_task_data WHERE task_area_id = $1 AND username = $2 AND statement_id = $3 `,
getQueryDataFromDBQuery: `SELECT query_text, result_size, is_executable FROM tool.user_task_data WHERE task_area_id = $1 AND username = $2 AND statement_id = $3 `,
getTimeDataFromDBQuery: `SELECT processing_time FROM tool.user_task_data WHERE task_area_id = $1 AND username = $2 AND statement_id = $3 `,
getDownloadDataFromDBQuery: `SELECT statement_id, query_text, result_size, is_executable, partial_solution, is_correct, difficulty_level, processing_time FROM tool.user_task_data WHERE task_area_id = $1 AND username = $2 order by statement_id`,
getExercisesCountQuery: `SELECT COUNT(*) FROM tool.task_statements WHERE statement_id = $1 AND area_id = $2`,
addExerciseQuery: `INSERT INTO tool.task_statements (statement_id, area_id, statement_text, solution_query, topic, subtasknumber, maxtime, hint, tasknumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
updateExerciseQuery: `UPDATE tool.task_statements SET statement_text = $1, solution_query = $2, topic = $3, subtasknumber = $4, maxtime = $5, hint = $6, tasknumber = $7 WHERE statement_id = $8 AND area_id = $9`,
deleteExerciseQuery: `DELETE FROM tool.task_statements WHERE statement_id = $1 AND area_id = $2`,
getAllExercisesQuery: `SELECT * FROM tool.task_statements order by area_id, statement_id`,
getStatementsQuery: `Select statement_id from tool.task_statements where area_id = $1 order by statement_id`, 
}   
module.exports = queries;