const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  favourite: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("person", PersonSchema);
