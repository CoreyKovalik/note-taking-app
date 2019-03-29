require('geckodriver');
require('chromedriver');

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Keys = require('selenium-webdriver/lib/input').Key,
    chrome = require('selenium-webdriver/chrome'),
    o = new chrome.Options();

const { browser, browserArguments } = require('../config/selenium-config');
o.addArguments(browserArguments);

class Page {
    constructor() {
        const driver = new webdriver.Builder()
            .forBrowser(browser)
            .setChromeOptions(o)
            .build();

        this.driver = driver;
    }

    visit(url) {
        return this.driver.get(url);
    }

    quit() {
        this.driver.quit();
    }

    async find(el, timeout=15000) {
        await this.driver.wait(until.elementLocated(By.css(el)), timeout);
        return await this.driver.findElement(By.css(el));
    }

    async findAll(el, timeout=15000) {
        await this.driver.wait(until.elementsLocated(By.css(el)), timeout);
        return await this.driver.findElements(By.css(el));
    }

    async write(el, text) {
        const element = await this.find(el)
        element.sendKeys(text);
    }

    async selectAllText(el) {
        const element = await this.find(el);
        element.sendKeys(Keys.chord(Keys.CONTROL, "a"))
    }

    async waitUntilNotVisible(el) {
        const element = await this.driver.findElement(By.css(el));
        this.driver.wait(until.e)
    }

    async checkExists(el) {
        try {
            const element = await this.find(el)
            return element;
        } 
        catch (err) {
            return false;
        }
    }
}

module.exports = Page;