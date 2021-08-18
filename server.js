const express = require("express");
const app = express();
const sql = require("mysql");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const { Telegraf } = require("telegraf");

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

app.get("/school/:filter", (req, res) => {
   connection.query(
      `SELECT * FROM student JOIN school ON school.studentid = student.id WHERE grad_type = ${req.params.filter} LIMIT 100`,
      (err, rows) => {
         if (err) {
            res.send(err);
            return;
         }
         res.send(rows);
      }
   );
});

const staticFileMiddleware = express.static(__dirname + "/dist");
app.use(staticFileMiddleware);
app.use(
   history({
      disableDotRule: true,
      verbose: true,
   })
);
app.use(staticFileMiddleware);

// const bot = new Telegraf("1896267928:AAENZHs-CcGovEtjFPncCPQrCiN766cBQd8");

// // bot.telegram.sendMessage();
// bot.command("start", (ctx) => {
//    console.log(ctx);
//    console.log(ctx.from);
//    bot.telegram.sendMessage(
//       ctx.chat.id,
//       "hello there! Welcome to my new telegram bot.",
//       {}
//    );
// });

// bot.command("get", (ctx) => {
//    console.log(ctx);
//    console.log(ctx.from);
//    bot.telegram.sendMessage(
//       ctx.chat.id,
//       "hello there! Welcome to my new telegram bot hohoOhoO.",
//       {}
//    );
// });

// bot.on("message", (ctx) => {
//    console.log(ctx);
//    ctx.telegram.sendMessage(
//       ctx.message.chat.id,
//       `Hello ${ctx.from.first_name}`
//    );
// });

// bot.hears("animals", (ctx) => {
//    console.log(ctx.from);
//    let animalMessage = `great, here are pictures of animals you would love`;
//    ctx.deleteMessage();
//    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
//       reply_markup: {
//          inline_keyboard: [
//             [
//                {
//                   text: "dog",
//                   callback_data: "dog",
//                },
//                {
//                   text: "cat",
//                   callback_data: "cat",
//                },
//             ],
//          ],
//       },
//    });
// });

// bot.action("dog", (ctx) => {
//    bot.telegram.sendMessage(ctx.message.id, "dog");
// });

// bot.action("cat", (ctx) => {
//    bot.telegram.sendMessage(ctx.message.id, "cat");
// });

// bot.launch();

// process.once("SIGINT", () => bot.stop("SIGINT"));
// process.once("SIGTERM", () => bot.stop("SIGTERM"));

app.listen(6600, () => {
   console.log(`server listening to port 6600`);
});
