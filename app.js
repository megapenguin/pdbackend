var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var parkinglotsRouter = require("./routes/parkinglots");
var imagesRouter = require("./routes/images");
var authenticateRouter = require("./routes/authenticates");
const fileUpload = require("express-fileupload");

var app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload());
app.use("/", indexRouter);
app.use("/api/v1/images", imagesRouter);
app.use("/api/v1/parkinglots", parkinglotsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/authenticate", authenticateRouter);

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

app.listen(PORT, () => console.log("Listening at port " + PORT));

module.exports = app;
