const express = require("express");
const {
  getAllTasks,
  createTask,
  verifyPostRequest,
} = require("../controllers/taskController");
const router = express.Router();
router.route("/tasks").get(getAllTasks).post(verifyPostRequest, createTask);
// router.route("/tasks/:id").get().post().delete();

module.exports = router;
