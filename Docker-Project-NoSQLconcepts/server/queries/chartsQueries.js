const chartsQueries = {
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
  userSolvedTaskCountQuery: ` SELECT 
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
};
module.exports = chartsQueries;
