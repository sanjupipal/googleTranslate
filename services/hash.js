const crypto = require("crypto");

const createHash = (method, text) => {
  let hash = crypto.createHash(method).update(text).digest("hex");
  return hash;
};

module.exports = {
  createHash,
};
