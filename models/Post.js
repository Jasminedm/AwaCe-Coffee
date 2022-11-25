const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  temp: {
    type: String,
    require: true,
  },
 
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  isCompleted: {
    type: String,
    require: true,
    default: 'pending'
  },
  barista:{
    type: String,
    require: true,
    default: ' '
  }
});

module.exports = mongoose.model("order", PostSchema);
