const mongoose = require("mongoose");

export default handler => async (req, res) => {
  const db = mongoose.connection;

  console.log("db.readyState", db.readyState);

  if (db.readyState == 1) return handler(req, res);

  mongoose.connect("mongodb://applicant:johndoethesuperapplicant0@ds019906.mlab.com:19906/heroku_l6prczn1", { useNewUrlParser: true });

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("We are connected to the DB");

    return handler(req, res);
  });
};
