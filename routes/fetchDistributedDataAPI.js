


const express = require('express');
const router = express.Router();
const DistributedTask = require('../models/DistributedTaskSchema');

// Fetch all distributed tasks
router.get('/fetchDistributedData', async (req, res) => {
  try {
    const tasks = await DistributedTask.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

module.exports = router