const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
  },
  taskName: {
    type: String,
    required: [true, "Please enter task details"],
    validate: [
      {
        validator: function (taskName) {
          
          return this.taskName.trim().length;
        
        },
        message: "task name should not be empty",
      },
      {
        validator: function () {
          const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
          if (re.test(this.taskName)) {
            return false;
          }
        },
        message: "taskName cannot be HTML",
      },
      {
        validator: function () {
          const re = /^[A-Za-z][A-Za-z0-9 -]*$/;
          if (re.test(this.taskName)) {
            return false;
          }
        },
        message: "first character should be alphabet only",
      }
    ],
  },
  status: {
    type: String,
    default: "Not Started",
    enum: ["Not Started", "In Process", "Completed"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
