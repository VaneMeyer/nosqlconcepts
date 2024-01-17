const Query = require("../models/query");


exports.inputquery = (req, res) => {
    const { query } = req.body;
    Query.find({ query: query })
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.error('Error with the query:', error);
      res.status(500).json({ error: 'Error with the query' });
    });
 
  };