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
        validator: function (taskName) {
          const re = /<("[^"]*?"|'[^']*?'|[^'">])*>/;
          if (re.test(this.taskName)) {
            return false;
          }
        },
        message: "taskName cannot be HTML",
      },
      {
        validator: function (taskName) {
          const re = /^[A-Za-z][A-Za-z0-9 -]*$/;
          if (!re.test(this.taskName)) {
            return false;
          }
        },
        message: "first character should be alphabet only & special characters not allowed",
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
