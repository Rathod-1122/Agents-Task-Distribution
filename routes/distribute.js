// routes/distribute.js

const express = require('express');
const router = express.Router();
const DistributedTask = require('../models/DistributedTask');

// Save distributed data
router.post('/save', async (req, res) => {
  try {
    console.log('the distributed data is :',req.body)
    const data = req.body; // should be an object with agentEmail as key
    const savePromises = Object.entries(data).map(async ([email, tasks]) => {
      return DistributedTask.findOneAndUpdate(
        { agentEmail: email },
        { tasks },
        { upsert: true, new: true }
      );
    });

    await Promise.all(savePromises);
    res.status(200).json({ message: 'Distributed tasks saved successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save distributed tasks.' });
  }
});

// Fetch all distributed tasks
router.get('/fetch', async (req, res) => {
  try {
    const tasks = await DistributedTask.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

module.exports = router;
