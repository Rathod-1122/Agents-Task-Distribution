// models/DistributedTask.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String
});

const distributedTaskSchema = new mongoose.Schema({
  agentEmail: String,
  tasks: [taskSchema]
});

module.exports = mongoose.model('DistributedTask', distributedTaskSchema);
