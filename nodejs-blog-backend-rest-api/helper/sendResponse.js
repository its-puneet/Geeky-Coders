const sendResponse = (statusCode, status, data, req, res) => {
  if (data) {
    res.status(statusCode).json({ status: status, data: [data] });
  } else {
    res.status(statusCode).json({ status: status });
  }
};

module.exports = sendResponse;
