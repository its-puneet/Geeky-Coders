const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: "ORDER NOT FOUND IN DB",
        });
      }

      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, savedOrder) => {
    if (err || !savedOrder) {
      return res.status(400).json({
        error: "FAILED TO SAVE ORDER IN THE DB",
      });
    }
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name email")
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          error: "NO ORDERS IN DB",
        });
      }

      return res.json(orders);
    });
};

exports.getOrderStaus = (req, res) => {
  return res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: "ORDER STATUS COULD NOT BE UPDATED",
        });
      }

      return res.json(order);
    }
  );
};
