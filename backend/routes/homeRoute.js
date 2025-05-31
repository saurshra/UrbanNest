const express = require("express");
const homeRouter = express.Router();
const controller = require("../controllers/homeController");

homeRouter.get("/", controller.getHomes);
homeRouter.get("/:id", controller.getHomesById);
homeRouter.post("/", controller.postHomes);
homeRouter.delete("/:id", controller.deleteHome);
homeRouter.put("/:id", controller.editHomeById);

module.exports = homeRouter;
