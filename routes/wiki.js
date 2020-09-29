const express = require("express");
const models = require("../models");
const Page = models.Page;
const User = models.User;
const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/");
});

router.post("/", (req, res, next) => {
  const page = Page.create({
    title: req.body.title,
    content: req.body.content,
  }).then(res.redirect("/"));
});

router.get("/add", (req, res, next) => {
  res.render("addpage");
});

module.exports = router;
