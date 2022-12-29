// @ts-nocheck
require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const { User } = require("./models/models");
const path = require("path");
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use("/", router);
app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.static(path.resolve(__dirname, "static/images")));
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    const getUserAd = await User.findOne({ where: { login: "pavel" } });
    !getUserAd &&
      (await User.create({
        login: "pavel",
        password:
          "$2b$05$6v2l2WL9BkEaPobRHldOFuszUUxh9Ih9SoJcW0HBux7RN6NzazPvO",
        role: "ADMIN",
      }));
    const getUserUs = await User.findOne({ where: { login: "student" } });
    !getUserUs &&
      (await User.create({
        login: "student",
        password:
          "$2b$05$arMvljQyV2Vshsm5eM9tYedu.McxfD5Ln9IyUx1eWfJ5/TAjG04uK",
      }));
    app.get("/", (req, res) => {
      res.sendFile("index.html");
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
