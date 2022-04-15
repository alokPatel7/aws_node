var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(cors({ origin: "*" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// const express = require("express");
// const app = express();
// var cors = require("cors");
// require("dotenv").config();
// const {
//   LexRuntimeServiceClient,
//   DeleteSessionCommand,
// } = require("@aws-sdk/client-lex-runtime-service");

// app.use(cors({ origin: "*" }));

// app.get("/", (req, res) => {
//   console.log("Message = " + req.query.message);
//   console.log("Number = " + req.query.number);
//   console.log("Subject = " + req.query.subject);
//   var params = {
//     Message: "req.query.message",
//     PhoneNumber: "+" + "7905845567",
//     MessageAttributes: {
//       //   "AWS.SNS.SMS.SenderID": { req.query.number
//       //     DataType: "String",
//       //     StringValue: req.query.subject,
//       //   },
//       //   "AWS.SNS.SMS.SMSType": {
//       //     DataType: "String",
//       //     StringValue: "Transactional",
//       //   },
//     },
//   };

//   var publishTextPromise = new AWS.SNS({ apiVersion: "2016-11-28" })
//     .publish(params)
//     .promise();

//   publishTextPromise
//     .then(function (data) {
//       res.end(JSON.stringify({ MessageID: data.MessageId }));
//     })
//     .catch(function (err) {
//       res.end(JSON.stringify({ Error: err }));
//     });
// });

// var client = new LexRuntimeServiceClient({
//   region: "us-east-1",
//   credentials: new AWS.Credentials({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey,
//   }),
// });

// app.listen(3000, () => console.log("SMS Service Listening on PORT 3000"));
