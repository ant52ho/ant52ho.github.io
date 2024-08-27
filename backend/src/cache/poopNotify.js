const transporter = require("../email/poopEmailIndex.js");

// class that handles whether notifications are ready to be sent
class PoopNotify {
  static #subscriberMap = {
    // anthony: ["clarebb@yahoo.ca"],
    anthony: ["anthony52ho@gmail.com"],
    clare: ["anthony52ho@gmail.com"],
  };

  static #lastSent = {
    anthony: null,
    clare: null,
  };

  // should have a var here that stores login info.

  // notifies all subcribers using subcriber map
  static async notify(user) {
    const delay = 300; // seconds
    let date = new Date();

    // determine if eligible to send email
    if (
      this.#lastSent[user] != null &&
      (date - this.#lastSent[user]) / 1000 <= delay
    ) {
      return `Did not notify subscribers of ${user}, last sent has not been ${delay} seconds`;
    } else {
      this.#lastSent[user] = date;
    }

    const dateStr =
      date.toLocaleDateString("en-US", { timeZone: "America/New_York" }) +
      " " +
      date.toLocaleTimeString("en-US", { timeZone: "America/New_York" }) +
      " EST";

    // email all subscribers in subscribers
    for (const email of this.#subscriberMap[user]) {
      const info = await transporter.sendMail({
        from: `${process.env.EMAIL2}`,
        to: email,
        subject: "Poop notification",
        html: `
              <h1>Poop recorded by ${user} at ${dateStr}</h1>
              `,
      });
    }

    console.log("Sent mail to subscribers of " + user);
  }
}

module.exports = { PoopNotify };
