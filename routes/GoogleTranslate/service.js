const { translateText } = require("../../services/translate");
const { createHash } = require("../../services/hash");
const {
  set,
  get,
  getSetValues,
  incSetValue,
  addSetValue,
} = require("../../services/redisClient");

const convertLanguage = async (req, res) => {
  try {
    const { text, targetedLanguage, state } = req.body;

    if (!text || !targetedLanguage || !state) {
      return res.status(400).json({ msg: "missing values" });
    }

    if (text.length > 200)
      return res.status(400).json({ msg: "text size should be less than 200" });
    const hash = createHash("MD5", text + targetedLanguage);
    const redisValue = await get(hash);
    let response;
    if (redisValue) {
      response = redisValue;
    } else {
      response = await translateText(text, targetedLanguage);
      await set(hash, response);
    }
    saveRelatedLanguages(state, text, targetedLanguage);
    return res.status(200).json({ text, translatedText: response });
  } catch (error) {
    return res.status(500).json({ msg: "server error", error });
  }
};

async function saveRelatedLanguages(state, text, targetedLanguage) {
  try {
    let data = await getSetValues(state);
    for (let index = 0; index < data.length; index++) {
      const value = data[index];
      const hash = createHash("MD5", text + value);
      const redisValue = await get(hash);
      if (!redisValue) {
        newText = await translateText(text, value);
        await set(hash, newText);
      }
    }

    let response = await addSetValue(state, targetedLanguage);
    if (!response) {
      incSetValue(state, targetedLanguage, 1);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  convertLanguage,
};
