const PoopTrack = require("../models/pooptrack");

// get daily entry
const getDailyEntry = async (user, date) => {
  const entry = await PoopTrack.getDailyEntry(user, date).catch((err) => {
    console.log("Error:", err);
  });

  return { count: entry ? entry.poopCount : 0 };
};

// update daily entry
const updateDailyEntry = async (user, date, count) => {
  let entry = await PoopTrack.getDailyEntry(user, date).catch((err) => {
    console.log("Error:", err);
  });

  // create if needed
  if (!entry) {
    await PoopTrack.createDailyEntry(user, date);
    entry = { poopCount: 0 };
  }

  // update
  await PoopTrack.updateDailyEntry(user, date, count);
  return { success: true, count };
};

module.exports = {
  getDailyEntry,
  updateDailyEntry,
};
