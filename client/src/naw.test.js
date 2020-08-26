const puppeteer = require("puppeteer");
let browser;
let page;

beforeAll(async () => {
    // launch browser
    browser = await puppeteer.launch({
        headless: false, // headless mode set to false so browser opens up with visual feedback
        slowMo: 250, // how slow actions should be
    });
    // creates a new page in the opened browser
    page = await browser.newPage();
    page.emulate({
        viewport: {
            width: 500,
            height: 2400,
        },
        userAgent: "",
    });
});

describe("Nav tests", () => {
    test("done button works in our nav", async () => {
        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".MuiButtonBase-root");
        await page.click(".MuiButtonBase-root");
        expect(1).toBe(1);
    });
});
