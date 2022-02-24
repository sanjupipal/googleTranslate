const { Translate } = require("@google-cloud/translate").v2;

const CREDENTIALS = require("../majestic-bloom-342115-a4992376e4b7.json");

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const translateText = async (text, targetLanguage) => {
  let response = await translate.translate(text, targetLanguage);
  return response[0];
};

const detectLanguage = async (text) => {
  let response = await translate.detect(text);
  return response;
};

module.exports = { translateText, detectLanguage };
