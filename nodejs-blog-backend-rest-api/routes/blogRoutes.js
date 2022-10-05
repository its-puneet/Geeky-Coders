const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getblogById,
  updateRelatedLinks,
} = require("../controllers/blogController");

//middlewares
const { verifyQueryParams } = require("../middlewares/blogMiddlewares");

const blogRoute = express.Router();

blogRoute.route("/").get(verifyQueryParams, getAllBlogs).post(createBlog);
blogRoute.route("/:blogId").get(getblogById);
blogRoute.route("/updateRelatedLinks").put(updateRelatedLinks);

module.exports = blogRoute;
