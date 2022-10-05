// class coustom error
class AppError extends Error {
  constructor(statusCode, status, message) {
    super();
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

module.exports = AppError;
