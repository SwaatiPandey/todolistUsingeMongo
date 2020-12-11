const fs = require("fs");
const path = require("path");
const Task = require("../models/task.js");
const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");
const fileName = path.join(__dirname, "..", "data", "tasks.json");
const tasks = JSON.parse(fs.readFileSync(fileName, "utf-8"));

const verifyPostRequest = (req, res, next) => {
  const requireProperties = ["taskName"];

  let result = requireProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    sendErrorMessage(
      new appError(400, "unsuccessful", "request body is inavlid"),
      req,
      res
    );
  } else {
    next();
  }
};

const getAllTasks = (req, res, next) => {
  sendResponse(200, "Successful", tasks, req, res);
};

const createTask = (req, res, next) => {
  let newTask = new Task(req.body.taskName);
  tasks.push(newTask);
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      sendErrorMessage(
        new AppError(500, "Internal Error", "Error in completing Request"),
        req,
        res
      );
      return err;
    }
    sendResponse(201, "Successful", newTask, req, res);
  });
};

// const getAllTasks = (req, res, next) => {
//   console.log("response from controller");
//   res.send("response to the users");
// };
// const createTask = (req, res, next) => {
//   console.log("Task is created");
//   res.send("Task created");
//   tasks.push(req.body);
//   fs.writeFile(fileName, JSON.stringify(tasks, null, 2), (err) => {
//     if (err) {
//       res.status(500).json({
//         status: "internal error",
//       });
//       return err;
//     }

//     res.status(201).json({
//       status: "succesfull",
//       data: [req.body],
//     });
//   });
// };
module.exports.getAllTasks = getAllTasks;
module.exports.createTask = createTask;
module.exports.verifyPostRequest = verifyPostRequest;
