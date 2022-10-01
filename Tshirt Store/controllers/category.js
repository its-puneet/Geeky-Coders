const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cat) => {
    if (err || !cat) {
      return res.status(400).json({
        error: "CATEGORY NOT FOUND IN DB",
      });
    }

    req.category = cat;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "NOT ABLE TO SAVE CATEGORY",
      });
    }

    return res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        error: "NO CATEGORIES FOUND",
      });
    }

    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  Category.findOneAndUpdate(
    { _id: req.category._id },
    { $set: req.body },
    { new: true },
    (err, updatedCategory) => {
      if (err || !updatedCategory) {
        return res.status(400).json({
          error: "COULD NOT UPDATE CATEGORY",
        });
      }

      return res.json(updatedCategory);
    }
  );
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, removedCategory) => {
    if (err || !removedCategory) {
      return res.status(400).json({
        error: "COULD NOT REMOVE CATEGORY",
      });
    }

    return res.json("SUCCESFULLY DELETED CATEGORY");
  });
};
