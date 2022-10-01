const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "PRODUCT NOT IN DB",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "PROBLEM WITH IMAGE",
      });
    }

    // Destructuring the fields
    const { name, description, price, category, stock } = fields;

    // Checking the validity of fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "PLEASE INCLUDE ALL FIELDS",
      });
    }

    let product = new Product(fields);

    // Handling the file
    if (file.photo) {
      //   console.log(file.photo.data);
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "FILE SIZE TOO BIG",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Saving to the db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Middleware to serve photo
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }

  next();
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, removedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "FAILED TO DELETE THE PRODUCT",
      });
    }

    return res.json({
      msg: "DELETION WAS SUCCESFULL",
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "COULD NOT UPDATE IMAGE",
      });
    }

    // Updation code
    let product = req.product;
    product = _.extend(product, fields);

    // Handling the file
    if (file.photo) {
      //   console.log(file.photo.data);
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Saving to the db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "UPDATION FAILED",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(400).json({
          error: "NO PRODUCT FOUND",
        });
      }

      return res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", (err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        error: "NO CATEGORY FOUND",
      });
    }

    return res.json(categories);
  });
};

// exports.updateStock = (req, res, next) => {
//   let myOperations = req.body.order.products.map((prod) => {
//     return {
//       updateOne: {
//         filer: { _id: prod._id },
//         update: { $inc: { stock: -prod.count, sold: prod.count } },
//       },
//     };
//   });

//   Product.bulkWrite(myOperations, {}, (err, products) => {
//     if (err || !products) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     res.json(products);
//     next();
//   });
// };

exports.updateStock = (req, res, next) => {
  req.body.order.products.map((prod) => {
    Product.findOneAndUpdate(
      { _id: prod._id },
      { $inc: { stock: -1, sold: 1 } }
    ).exec((err, saved) => {
      if (err || !saved) {
        return res.status(400).json({
          error: "FAILED TO UPDATE STOCK",
        });
      }
    });
  });
  next();
};
