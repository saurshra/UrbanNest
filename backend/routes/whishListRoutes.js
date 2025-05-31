const express = require("express");
const whishListRouter = express.Router();
const controller = require("../controllers/whishListController");

whishListRouter.post("/whishlist", controller.postWhishList);
whishListRouter.get("/whishlist", controller.getWhishList);
whishListRouter.delete("/whishlist/:id", controller.deleteWhishList);

module.exports = whishListRouter;
