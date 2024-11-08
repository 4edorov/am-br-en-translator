const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  constructor() {
    this.locales = {
      "american-to-british": "american-to-british",
      "british-to-american": "british-to-american"
    };

    this.timeSeparator = {
      "american-to-british": ".",
      "british-to-american": ":"
    }

    this.translators = {
      "american-to-british": {
        "only": americanOnly,
        "spelling": americanToBritishSpelling,
        "titles": americanToBritishTitles,
        "time": /([0-9]{1,2}):([0-9]{2})/g
      },
      "british-to-american": {
        "only": britishOnly,
        "spelling": Object.fromEntries(Object.entries(americanToBritishSpelling).map(([key, value]) => [value, key])),
        "titles": Object.fromEntries(Object.entries(americanToBritishTitles).map(([key, value]) => [value, key])),
        "time": /([0-9]{1,2}).([0-9]{2})/g
      }
    }
  }

  addHighlight(text) {
    return `<span class="highlight">${text}</span>`
  }

  translate(text, locale) {
    const methods = this.translators[locale];

    Object.keys(methods).forEach((method) => {
      const translatorCollection = methods[method];
      switch (method) {
        case "time": {
          const matches = text.match(translatorCollection)
          if (matches) {
            matches.forEach((match) => {
              const highlighted = this.addHighlight(match.replace(/\.|\:/, this.timeSeparator[locale]))
              text = text.replaceAll(match, highlighted)
            });
          }
          break;
        }
        case "titles": {
          Object.keys(translatorCollection).forEach((key) => {
            const formattedKey = key[0].toUpperCase() + key.slice(1);
            const formattedTranslatedKey = translatorCollection[key][0].toUpperCase() + translatorCollection[key].slice(1);
            text = text.replaceAll(new RegExp(`${formattedKey.replace(".", "\\.")}(\\s|\\.|$)`, "ig"), `${this.addHighlight(formattedTranslatedKey)}$1`);
          })
          break;
        }
        default: {
          Object.keys(translatorCollection).forEach((key) => {
            text = text.replaceAll(new RegExp(`(?<!-)\\b${key}\\b`, "ig"), this.addHighlight(translatorCollection[key]));
          });
        }
      }
    })

    return text;
  }
}

module.exports = Translator;
