const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Task = require("../models/taskSchema.js");
const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");
const uniqid = require("uniqid");

const verifyPostRequest = (req, res, next) => {
  const requireProperties = ["taskName"];

  let result = requireProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    sendErrorMessage(
      new AppError(400, "unsuccessful", "request body is inavlid"),
      req,
      res
    );
  } else {
    next();
  }
};

const getAllTasks = (req, res, next) => {
  Task.find({})
    .then((data) => {
      sendResponse(200, "Successful", data, req, res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createTask = (req, res, next) => {
  let newTask = new Task({ taskId: uniqid() ,taskName: req.body.taskName });
  newTask
    .save()
    .then((data) => {
      // console.log(data);
      sendResponse(201, "Successful", data, req, res);
    })
    .catch((err) => {
      console.log(err);
      sendErrorMessage(
        new AppError(500, "unsuccessful", err.message),
        req,
        res
      );
    });
};
//find by id
const findById = (req, res, next) => {
  Task.findById(req.params.id)
    .then((data) => {
      // console.log(data);
      sendResponse(201, "Successfull", data, req, res);
    })
    .catch((err) => {
      console.log(err);
      sendErrorMessage(
        new AppError(400, "Unsuccessful", "Id not found"),
        req,
        res
      );
    });
};

//update
const updateTask = (req, res, next) => {
  // console.log(req.params);
  Task.findOneAndUpdate(
    { taskId: req.params.id },
    { taskName: req.body.taskName, status: "completed" },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
//delete
const deleteById = (req, res, next) => {
  Task.findOneAndDelete({ taskId: req.params.id })
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getAllTasks = getAllTasks;
module.exports.findById = findById;
module.exports.createTask = createTask;
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.updateTask = updateTask;
module.exports.deleteById = deleteById;
