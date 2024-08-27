const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const PoopTrack = sequelize.define("pooptrack", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  poopDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    // defaultValue: DataTypes.NOW, // doesn't work
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poopCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// gets daily entry given user and date
PoopTrack.getDailyEntry = async function (user, date) {
  return this.findOne({
    raw: true,
    where: {
      poopDate: date,
      name: user,
    },
  });
};

// create daily entry
PoopTrack.createDailyEntry = async function (user, date) {
  return this.create({
    poopDate: date,
    name: user,
    poopCount: 0,
  });
};

// update daily entry
PoopTrack.updateDailyEntry = async function (user, date, count) {
  console.log(user, date, count);
  return this.update(
    { poopCount: count },
    {
      where: {
        poopDate: date,
        name: user,
      },
    }
  );
};

module.exports = PoopTrack;
