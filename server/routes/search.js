const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

// search POST request
router.post("/", (req, res) => {

  // send the search term to the python scripts
  const pythonProcess = spawn("python", [
    `${process.cwd()}\\scrapers\\main.py`,
    req.body.searchTerm,
  ]);

  // send results to client side
  pythonProcess.stdout.on("data", (result) => {
    return res.send({data : JSON.parse(result.toString())})
  });

  // in case of an error
  pythonProcess.stderr.on("data", (error) => {
    console.log(error.toString())
    return res.status(500).send({ message: "Could not find any results.."})
  });
});

module.exports = router;
