const uniqid = require("uniqid");
class Task {
  constructor(taskName, status = "pending") {
    this.taskId = uniqid();
    this.taskName = taskName;
    this.status = "Pending";
  }
}
module.exports = Task;
