// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'dshdsdhsdh': (browser) => {
      browser
        .url(process.env.VUE_DEV_SERVER_URL)
        .waitForElementVisible('#game1', 5000)
        .assert.containsText('div', 'code')
        .click('#game1 button:first-child')
        .waitForElementVisible('#game1 table', 5000)
        .pause(1000)
        .click('#game1 table tr:nth-child(1) td:nth-child(1)')
        .execute("return document.getElementsByTagName('strong')[0].innerText", [], (value) => {
            const code = value.value;
            browser
                .setValue('#game2 input', code)
                .click('#game2 button.join-code')
                .waitForElementVisible('#game1 table', 5000)
                .click('#game2 table tr:nth-child(2) td:nth-child(1)')
                .pause(1000)
                .click('#game1 table tr:nth-child(1) td:nth-child(2)')
                .pause(1000)
                .click('#game2 table tr:nth-child(2) td:nth-child(2)')
                .pause(1000)
                .click('#game1 table tr:nth-child(1) td:nth-child(3)')
                .pause(1000)
                .assert.containsText('#game1', 'X won!!!')
                .assert.containsText('#game2', 'X won!!!')
                .pause(10000)
                .end();
        });

        
    },
  };
  