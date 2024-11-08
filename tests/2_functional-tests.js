const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
let translator = new Translator();

suite('Functional Tests', () => {
  suite("POST /api/translate", () => {
    test("Should respond with text and locale fields", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit.", locale: translator.locales["american-to-british"] })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "text");
          assert.property(res.body, "translation");
          assert.equal(res.body.text, "Mangoes are my favorite fruit.")
          assert.equal(res.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
          done();
        });
    });
  });

  suite("POST /api/translate", () => {
    test("Should respond with text and invalid locale field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit.", locale: "british" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid value for locale field")
          done();
        });
    });
  });

  suite("POST /api/translate", () => {
    test("Should respond with missing text field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ locale: translator.locales["american-to-british"] })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Required field(s) missing")
          done();
        });
    });
  });

  suite("POST /api/translate", () => {
    test("Should respond with missing locale field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit." })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Required field(s) missing")
          done();
        });
    });
  });

  suite("POST /api/translate", () => {
    test("Should respond with missing locale field", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "No text to translate")
          done();
        });
    });
  });

  suite("POST /api/translate", () => {
    test("Should respond with text and locale fields", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit.", locale: translator.locales["british-to-american"] })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "text");
          assert.property(res.body, "translation");
          assert.equal(res.body.text, "Mangoes are my favorite fruit.")
          assert.equal(res.body.translation, "Everything looks good to me!");
          done();
        });
    });
  });
});
