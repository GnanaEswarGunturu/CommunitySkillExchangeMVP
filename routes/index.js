const router = require('express').Router();
const Exchange = require('../models/Exchange');

import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import Skill from '../models/Skill.js';


const upload = multer({ storage });

// Upload media files
router.post('/upload', upload.array('media', 5), async (req, res) => {
  try {
    const urls = req.files.map(file => file.path);
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other routes...

export default router;

// Get all exchanges
router.get('/exchanges', async (req, res) => {
  try {
    const exchanges = await Exchange.find()
      .populate('provider', 'username')
      .populate('seeker', 'username');
    res.json(exchanges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new exchange
router.post('/exchanges', async (req, res) => {
  try {
    const { providerId, seekerId, skill, duration, date } = req.body;
    const newExchange = new Exchange({
      provider: providerId,
      seeker: seekerId,
      skill,
      duration,
      date
    });
    const savedExchange = await newExchange.save();
    res.status(201).json(savedExchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
