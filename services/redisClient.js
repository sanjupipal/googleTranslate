const { createClient } = require("redis");

let Client;

(async () => {
  Client = createClient();

  Client.on("connect", function () {
    console.log("Redis Sever Connected");
  });
  Client.on("error", (err) => console.log("Redis Client Error", err));

  await Client.connect();
})();

module.exports.Client = Client;
module.exports.addSetValue = async (setName, value, score = 1) => {
  let response = await Client.zAdd(setName, [{ score, value }]);
  return response;
};
module.exports.getSetValues = async (setName) => {
  let response = await Client.sendCommand([
    "ZREVRANGEBYSCORE",
    setName,
    "+inf",
    "-inf",
    "limit",
    0,
    3,
  ]);
  return response;
};
module.exports.incSetValue = async (setName, valueName, incBy) => {
  let response = await Client.sendCommand([
    "ZINCRBY",
    setName,
    incBy,
    valueName,
  ]);
  return response;
};
module.exports.get = async (key) => {
  let response = await Client.get(key);
  return response;
};
module.exports.del = async (key) => {
  let response = await Client.del(key);
  return response;
};
module.exports.set = async (key, data, expTime = 15920) => {
  let response = await Client.set(key, data, "EX", expTime);
  return response;
};
