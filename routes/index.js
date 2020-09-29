const express = require("express");
const wikiRouter = require("./wiki");
const userRouter = require("./user");
const router = express.Router();

router.use("/wiki", wikiRouter);

module.exports = router;
