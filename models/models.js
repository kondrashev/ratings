const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Discipline = sequelize.define("discipline", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Group = sequelize.define("group", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  moodle: { type: DataTypes.BOOLEAN, allowNull: false },
});

const Student = sequelize.define("student", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  surName: { type: DataTypes.STRING, allowNull: false },
  nameDiscipline: { type: DataTypes.STRING },
  options: { type: DataTypes.TEXT },
  teacher: { type: DataTypes.INTEGER },
  conspectus: { type: DataTypes.INTEGER },
  exercise: { type: DataTypes.INTEGER },
  rating: { type: DataTypes.INTEGER },
  report: { type: DataTypes.STRING },
  exam: { type: DataTypes.STRING },
});

const Dates = sequelize.define("dates", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  listDates: { type: DataTypes.TEXT },
});

Discipline.hasMany(Group, { onDelete: "cascade" });
Group.belongsTo(Discipline);
Group.hasMany(Student, { onDelete: "cascade" });
Student.belongsTo(Group);
Group.hasOne(Dates, { onDelete: "cascade" });

module.exports = {
  User,
  Discipline,
  Group,
  Student,
  Dates,
};
