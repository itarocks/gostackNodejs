//rotas da aplicacao
const express = require("express");
const session = require("express-session");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);
const routes = express.Router();
const flash = require("connect-flash");

const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashboardController = require("./app/controllers/DashBoardController");
const FileController = require("./app/controllers/FileController");

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash("sucess");
  res.locals.flashError = req.flash("error");
  return next();
});

routes.get("/", guestMiddleware, SessionController.create);

routes.post("/signin", SessionController.store);

routes.get("/files/:file", FileController.show);

//todos que passam pela rota app
//vao estar protegidas pelo middleware
routes.use("/app", authMiddleware);

routes.get("/signup", UserController.create);
routes.post(
  "/signup",
  guestMiddleware,
  upload.single("avatar"),
  UserController.store
);

routes.get("/app/dashboard", DashboardController.index);

routes.get("/app/logout", SessionController.destroy);

module.exports = routes;
