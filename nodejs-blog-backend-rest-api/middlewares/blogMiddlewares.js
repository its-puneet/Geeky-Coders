const AppError = require("../helper/appErrorClass");
const sendErrorMessage = require("../helper/sendError");

const verifyQueryParams = (req, res, next) => {
  if (req.query != null) {
    let validationArray = ["author", "title", "content", "imageUrl", "links"];
    let extractedValidKeys = {};
    validationArray.forEach((key) => {
      if (req.query[key] == "") {
        extractedValidKeys[key] = 1;
      }
    });
    if (extractedValidKeys == null) {
      return sendErrorMessage(
        new AppError(400, "unsuccessful", "invalid query param"),
        req,
        res
      );
    } else {
      req.query = extractedValidKeys;
      next();
    }
  } else {
    next();
  }
};

module.exports = {
  verifyQueryParams,
};
