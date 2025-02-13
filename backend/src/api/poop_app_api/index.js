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
  // console.log("Cache value:", PoopCache.db);
  return res.status(200).json(PoopCache.db);
});

// increment
router.post("/increment", async (req, res) => {
  const { user } = req.body;
  const result = PoopCache.increment(user);
  return res.status(200).json(result);
});

// decrement
router.post("/decrement", async (req, res) => {
  const { user } = req.body;
  const result = PoopCache.decrement(user);
  return res.status(200).json(result);
});

module.exports = router;
