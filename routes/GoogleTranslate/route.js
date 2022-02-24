const router = require("express").Router();

const { convertLanguage } = require("./service");

router.post("/", convertLanguage);

module.exports = router;
