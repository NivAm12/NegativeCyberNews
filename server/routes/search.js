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

    //send response with the data
    return res.send({data : JSON.parse(result.toString())})
  });

  // in case of an error
  pythonProcess.stderr.on("data", (error) => {

    // log the error
    console.log(error.toString())

    //send response with error message
    return res.status(500).send({ message: "Could not find any results.."})
  });
});

// export the router
module.exports = router;
