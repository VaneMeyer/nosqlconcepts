const adminQueries = {
    getUsersQuery: `SELECT DISTINCT username FROM tool.user_task_data`,
    getAllExercisesQuery: `SELECT s.statement_id, s.statement_text, s.area_id, a.area_name, s.topic, s.subtasknumber, s.maxtime, s.hint, s.solution_query  FROM tool.task_statements s, tool.task_areas a where s.area_id = a.area_id order by area_id, statement_id`,
    deleteExerciseQuery: `DELETE FROM tool.task_statements WHERE statement_id = $1 AND area_id = $2`,
    addExerciseQuery: `INSERT INTO tool.task_statements (statement_id, area_id, statement_text, solution_query, topic, subtasknumber, maxtime, hint, tasknumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    updateExerciseQuery: `UPDATE tool.task_statements SET statement_text = $1, solution_query = $2, topic = $3, subtasknumber = $4, maxtime = $5, hint = $6, tasknumber = $7 WHERE statement_id = $8 AND area_id = $9`,
    addAssignmentQuery: `INSERT INTO tool.task_areas (area_id, area_name, descr, link, endpoint, is_active) VALUES ($1, $2, $3, $4, $5, $6);`,
    getAllAssignmentsQuery:`SELECT * FROM tool.task_areas order by area_id`,
    deleteAssignmentQuery: `DELETE FROM tool.task_areas WHERE area_id = $1`,
    updateAssignmentQuery: `UPDATE tool.task_areas SET area_name = $2, descr = $3, link = $4, endpoint = $5, is_active = $6, feedback_on = $7 WHERE area_id = $1`,
    getStatusQuery:`SELECT is_active FROM tool.task_areas WHERE area_id = $1`,
    updateStatusQuery: `UPDATE tool.task_areas SET is_active = $2 WHERE area_id = $1`,
    deleteUserDataQuery: `DELETE FROM tool.user_task_data WHERE data_id = $1`,
    deleteAllUserDataQuery: `DELETE FROM tool.user_task_data WHERE username = $1`,
    deleteAllHistoryDataQuery: `DELETE FROM tool.query_history WHERE username = $1`,
    getAllUserTaskData: `SELECT data_id,username,statement_id,task_area_id,is_executable,result_size,is_correct,difficulty_level,processing_time,is_finished FROM tool.user_task_data`,
    getAllHistoryData:`SELECT history_id,username,statement_id,task_area_id,is_executable,result_size,is_correct,executed_at FROM tool.query_history`,
  }
  module.exports = adminQueries;
  