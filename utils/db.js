const mongoose = require("mongoose");
const { default: { mongoURI }} = require('../config/index.js')

export default handler => async (req, res) => {
  const db = mongoose.connection;

  console.log("db.readyState", db.readyState);

  if (db.readyState == 1) return handler(req, res);

  mongoose.connect(mongoURI, { useNewUrlParser: true });

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("We are connected to the DB");

    return handler(req, res);
  });
};
