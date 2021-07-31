const express = require("express");
const app = express();
const sql = require("mysql");
const cors = require("cors");

const connection = sql.createConnection({
   host: "localhost",
   user: "devone",
   password: "uni_Dijla_87601",
   database: "portal",
   port: "3306",
});

connection.connect((error) => {
   if (error) throw error;
   console.log("Successfully connected to the database.");
});

app.use(cors());
app.get("/student", (req, res) => {
   connection.query(
      "SELECT * FROM student JOIN school ON school.studentid = student.id LIMIT 100",
      (err, rows) => {
         if (err) {
            res.send(err);
            return;
         }
         res.send(rows);
      }
   );
});

app.listen(6600, () => {
   console.log(`server listening to port 6600`);
});
