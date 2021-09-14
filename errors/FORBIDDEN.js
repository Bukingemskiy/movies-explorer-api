module.exports = class FORBIDDEN extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
