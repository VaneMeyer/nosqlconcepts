
const mainQueries = {
  areaNamesQuery: `SELECT area_id, area_name FROM tool.task_areas order by area_id`,
  getHistoryQuery: ` SELECT query_text, executed_at FROM tool.query_history WHERE username = $1 AND task_area_id = $2`,
  getUserDataQuery: `SELECT * FROM tool.user_task_data WHERE username = $1 AND task_area_id = $2 order by statement_id`,
  getTasksQuery: `SELECT tasknumber, topic, subtasknumber, maxtime, statement_text as description, hint FROM tool.task_statements WHERE area_id = $1 order by statement_id;`,

  getTaskFormDataQuery: `SELECT query_text, result_size, is_executable, is_correct, partial_solution, difficulty_level, is_finished FROM tool.user_task_data WHERE task_area_id = $1 AND username = $2 AND statement_id = $3 `,
  storeHistoryDataQuery: `INSERT INTO tool.query_history (
        username,
        statement_id,
        task_area_id,
        query_text,
        is_executable,
        result_size,
        is_correct
      ) VALUES ($1, $2, $3, $4, $5, $6, $7);`,
  getPgStructureQuery: `SELECT 
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
      c.table_schema = 'public';`,
  getSolutionQuery: `SELECT solution_query FROM tool.task_statements WHERE statement_id = $1 AND area_id = $2`,
  getDownloadDataFromDBQuery: `SELECT statement_id, query_text, result_size, is_executable, partial_solution, is_correct, difficulty_level, processing_time, is_finished FROM tool.user_task_data WHERE task_area_id = $1 AND username = $2 order by statement_id`,
  getTimerQuery:`Select processing_time from tool.user_task_data where username = $1 and task_area_id = $2 and statement_id = $3`,
  postTimerQuery:`UPDATE tool.user_task_data SET processing_time = $4 where username = $1 and task_area_id = $2 and statement_id = $3`,

};

module.exports = mainQueries;
