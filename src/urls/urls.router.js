const router = require("express").Router({ mergeParams: true });
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const usesRouter = require("../uses/uses.router");

router.use("/:urlId", controller.urlExists, usesRouter);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
