const loginQueries = {
  loginQuery: `SELECT * FROM private.users WHERE user_name = $1 AND password = $2;`,
};
module.exports = loginQueries;
