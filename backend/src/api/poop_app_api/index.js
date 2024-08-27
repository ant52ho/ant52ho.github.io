const express = require("express");
const router = express.Router();
const PoopTrack = require("../../models/pooptrack");
const poopTrackController = require("../../controllers/poopTrackController");
const PoopCache = require("../../cache/poopdb");

// Get daily entry
router.get("/dailyentry", async (req, res) => {
  const { user, date } = req.body;
  const result = await poopTrackController.getDailyEntry(user, date);
  return res.status(200).json(result);
});

// update daily entry with values
router.post("/dailyentry", async (req, res) => {
  const { user, date, count } = req.body;
  const result = await poopTrackController.updateDailyEntry(user, date, count);
  return res.status(200).json(result);
});

// Get cache
router.get("/dailycache", async (req, res) => {
  return res.status(200).json(PoopCache.db);
});

module.exports = router;
