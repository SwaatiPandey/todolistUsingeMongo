const express = require("express");
const {
  getAllTasks,
  createTask,
  verifyPostRequest,
  updateTask,
} = require("../controllers/taskController");
const router = express.Router();
router.route("/tasks").get(getAllTasks).post(verifyPostRequest, createTask);
router.route("/tasks/:id").patch(updateTask).delete();

module.exports = router;
