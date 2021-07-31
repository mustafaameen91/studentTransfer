const express = require("express");
const app = express();
const sql = require("mysql");
const cors = require("cors");

const connection = sql.createConnection({
   host: "localhost",
   user: "russel",
   password: "superSecretPassword!123",
   database: "universitydb",
   port: "3306",
});

connection.connect((error) => {
   if (error) throw error;
   console.log("Successfully connected to the database.");
});

app.use(cors());

app.listen(6600, () => {
   console.log(`server listening to port 6600`);
});
