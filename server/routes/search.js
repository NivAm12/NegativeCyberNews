const { isLoggedIn } = require("../middleware");
const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/", (req, res) => {
  const pythonProcess = spawn("python", [
    `${process.cwd()}\\scrapers\\main.py`,
    req.body.searchTerm,
  ]);

  pythonProcess.stdout.on("data", (result) => {
    return res.send({data : JSON.parse(result.toString())})
  });

  pythonProcess.stderr.on("data", (data) => {
    console.log("sdfsdf")
    return res.status(500).send({ message: "Could not find any results.."})
  });
});

module.exports = router;
