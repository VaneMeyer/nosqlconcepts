const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  query: { type: String },
});

module.exports = mongoose.model("Query", querySchema);
