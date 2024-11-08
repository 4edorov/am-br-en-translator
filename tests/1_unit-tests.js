const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

const translateTestData = new Map([
  ["Mangoes are my favorite fruit.",
    {
      locale: "american-to-british",
      expected: "Mangoes are my <span class=\"highlight\">favourite</span> fruit."
    }
  ],
  ["I ate yogurt for breakfast.",
    {
      locale: "american-to-british",
      expected: "I ate <span class=\"highlight\">yoghurt</span> for breakfast."
    }
  ],
  ["We had a party at my friend's condo.",
    {
      locale: "american-to-british",
      expected: "We had a party at my friend's <span class=\"highlight\">flat</span>."
    }
  ],
  ["Can you toss this in the trashcan for me?",
    {
      locale: "american-to-british",
      expected: "Can you toss this in the <span class=\"highlight\">bin</span> for me?"
    }
  ],
  ["The parking lot was full.",
    {
      locale: "american-to-british",
      expected: "The <span class=\"highlight\">car park</span> was full."
    }
  ],
  ["Like a high tech Rube Goldberg machine.",
    {
      locale: "american-to-british",
      expected: "Like a high tech <span class=\"highlight\">Heath Robinson device</span>."
    }
  ],
  ["To play hooky means to skip class or work.",
    {
      locale: "american-to-british",
      expected: "To <span class=\"highlight\">bunk off</span> means to skip class or work."
    }
  ],
  ["No Mr. Bond, I expect you to die.",
    {
      locale: "american-to-british",
      expected: "No <span class=\"highlight\">Mr</span> Bond, I expect you to die."
    }
  ],
  ["Dr. Grosh will see you now.",
    {
      locale: "american-to-british",
      expected: "<span class=\"highlight\">Dr</span> Grosh will see you now."
    }
  ],
  ["Lunch is at 12:15 today.",
    {
      locale: "american-to-british",
      expected: "Lunch is at <span class=\"highlight\">12.15</span> today."
    }
  ],
  ["We watched the footie match for a while.",
    {
      locale: "british-to-american",
      expected: "We watched the <span class=\"highlight\">soccer</span> match for a while."
    }
  ],
  ["Paracetamol takes up to an hour to work.",
    {
      locale: "british-to-american",
      expected: "<span class=\"highlight\">Tylenol</span> takes up to an hour to work."
    }
  ],
  ["First, caramelise the onions.",
    {
      locale: "british-to-american",
      expected: "First, <span class=\"highlight\">caramelize</span> the onions."
    }
  ],
  ["I spent the bank holiday at the funfair.",
    {
      locale: "british-to-american",
      expected: "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>."
    }
  ],
  ["I had a bicky then went to the chippy.",
    {
      locale: "british-to-american",
      expected: "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>."
    }
  ],
  ["I've just got bits and bobs in my bum bag.",
    {
      locale: "british-to-american",
      expected: "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>."
    }
  ],
  ["The car boot sale at Boxted Airfield was called off.",
    {
      locale: "british-to-american",
      expected: "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off."
    }
  ],
  ["Have you met Mrs Kalyani?",
    {
      locale: "british-to-american",
      expected: "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?"
    }
  ],
  ["Prof Joyner of King's College, London.",
    {
      locale: "british-to-american",
      expected: "<span class=\"highlight\">Prof.</span> Joyner of King's College, London."
    }
  ],
  ["Tea time is usually around 4 or 4.30.",
    {
      locale: "british-to-american",
      expected: "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>."
    }
  ]
])

const highlightTestData = new Map([
  ["Mangoes are my favorite fruit.",
    {
      locale: "american-to-british",
      expected: "Mangoes are my <span class=\"highlight\">favourite</span> fruit."
    }
  ],
  ["I ate yogurt for breakfast.",
    {
      locale: "american-to-british",
      expected: "I ate <span class=\"highlight\">yoghurt</span> for breakfast."
    }
  ],
  ["We watched the footie match for a while.",
    {
      locale: "british-to-american",
      expected: "We watched the <span class=\"highlight\">soccer</span> match for a while."
    }
  ],
  ["Paracetamol takes up to an hour to work.",
    {
      locale: "british-to-american",
      expected: "<span class=\"highlight\">Tylenol</span> takes up to an hour to work."
    }
  ]
]);

suite('Unit Tests', () => {
  translateTestData.forEach((value, key) => {
    test(`Should translate: '${key}' to '${value.locale}'`, () => {
      assert.strictEqual(translator.translate(key, value.locale), value.expected);
    })
  })
  highlightTestData.forEach((value, key) => {
    test(`Should highlight translation in: '${key}' to '${value.locale}'`, () => {
      assert.strictEqual(translator.translate(key, value.locale), value.expected);
    })
  })
});
