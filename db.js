const mongoose = require("mongoose");
//Set up default mongoose connection
const mongoURL = "mongodb://localhost:27017/hotels";
mongoose.connect(mongoURL);
//Get the default connection
var db = mongoose.connection;

db.on("connected", () => {
  console.log("connected");
});

db.on("error", () => {
  console.log("error");
});

db.on("disconnected", () => {
  console.log("disconnected");
});
db.on("close", () => {
  console.log("close");
});

module.exports = db;
