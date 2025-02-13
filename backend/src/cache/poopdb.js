const poopTrackController = require("../controllers/poopTrackController");

class PoopCache {
  // main db. statically accessible.
  static db = {
    anthony: 0,
    clare: 0,
  };

  static curdate;
  static hasInit = false;

  // static sync
  static async sync() {
    var nowEST = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const curdate = nowEST.toISOString().split("T")[0];

    console.log("syncced!");
    for (let key in this.db) {
      const result = await poopTrackController.updateDailyEntry(
        key,
        curdate,
        this.db[key]
      );
    }
  }

  // static reset
  static async reset() {
    for (let key in this.db) {
      this.db[key] = 0;
    }
  }

  // scheduler
  static #scheduleNextRun() {
    // set date if is past 11:59pm (ie is 11:59:01)
    var nowEST = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    var targetTimeEST = new Date(
      nowEST.getFullYear(),
      nowEST.getMonth(),
      nowEST.getDate(),
      23,
      59,
      0,
      0
    );

    if (nowEST > targetTimeEST) {
      targetTimeEST.setDate(targetTimeEST.getDate() + 1);
    }

    // schedule next run + set static var
    this.curdate = nowEST.toISOString().split("T")[0];
    var millisTill1159 = targetTimeEST - nowEST;

    // write back all data, reset cache values to 0
    setTimeout(async () => {
      await this.sync();
      this.reset();
      this.#scheduleNextRun();
    }, millisTill1159);
  }

  // init cache
  static init() {
    if (this.hasInit == true) return;
    this.hasInit = true;
    this.#scheduleNextRun();
  }

  static increment(user) {
    this.db[user] += 1;
    return this.db;
  }

  static decrement(user) {
    if (this.db[user] > 0) {
      this.db[user] -= 1;
    }
    return this.db;
  }
}

// init poopcache
PoopCache.init();

module.exports = PoopCache;
