import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  });

  test('should add selector valid', async () => {
    await page.goto(baseUrl);
    const input = await page.$('#card_number');
    const submit = await page.$('#submit_btn');
    await input.type('4485633815877430');
    submit.click();
    await page.waitForSelector('.valid');
  });

  test('should add selector invalid', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.form-control');
    const submit = await page.$('.submit');
    await input.type('44856338158774301234');
    submit.click();
    await page.waitForSelector('.invalid');
  });
});

  