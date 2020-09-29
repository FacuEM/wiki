const express = require("express");
const router = require("./routes");
const app = express();
const models = require("./models");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

var env = nunjucks.configure("views", { noCache: true });

app.set("view engine", "html");

app.engine("html", nunjucks.render);

app.use(express.static("./stylesheets"));

app.use(morgan("tiny"));

app.use("/", router);

models.db
  .sync({})
  .then(function () {
    app.listen(3000, function () {
      console.log("Server is listening on port 3000!");
    });
  })
  .catch(console.error);
