const router = require("express").Router();

const GoogleTranslate = require("./GoogleTranslate/route");

router.use("/translate", GoogleTranslate);

module.exports = router;
