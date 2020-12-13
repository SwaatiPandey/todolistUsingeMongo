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
app.put("/update/:id", (res, res) => {
  const updateTask = arr.find((task) => {
    console.log("inside put:", task.id == req.params.id);
    return task.id == req.params.id;
  });
  let key = Object.keys(updateTask);
  console.log(key);
  let reqKeys = Object.keys(req.body);
  console.log(reqKeys);
  if (key.includes(reqKeys)) {
    updateTask.status = req.body.status;
    res.status(200).json({
      message: "Successful",
    });
  } else {
    res.status(400).jason({
      message: "Unsuccessful",
    });
  }
});
app.delete("/delete/:id", (res, res) => {
  const deleteTask = arr.find((task) => {
    console.log("delete:", task.id == req.params.id);
  });
  console.log("deleteTask:", deleteTask);
  let index = arr.indexOf(deleteTask);
  console.log(index);
  arr.splice(index, 1);
  res.json(deleteTask);
});

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
