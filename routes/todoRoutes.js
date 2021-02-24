const express = require("express");
const {
  getAllTasks,
  findById,
  createTask,
  verifyPostRequest,
  updateTask,
  updateStatus,
  deleteById,
} = require("../controllers/taskController");
const router = express.Router();
router.route("/tasks").get(getAllTasks).post(verifyPostRequest, createTask);
router.route("/tasks/:id").patch(updateTask).put(updateStatus).delete(deleteById).get(findById);

module.exports = router;
