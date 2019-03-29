const Page = require('../lib/newnote-page.js');
const { rootURL } = require('../config/selenium-config');

jest.setTimeout(12000);

describe('Note Taking App - E2E tests in Selenium', () => {
    let page;

    beforeEach(async () => {
        // build webdriver instance for a test
        page = new Page();
        // open the app in browser
        await page.visit(rootURL);
    });

    afterEach(() => {
        // quit the webdriver instance for the test
        page.quit();
    });

    describe('test creating a new note', () => {
        let expectedTitle = 'Selenium Test Title';
        let expectedMessage = 'Selenium Test Message Body -- Lorem Ispum';

        test('should type in title textarea', async () => {
            const title = await page.writeTitle();

            expect(title).toBe(expectedTitle);
        });

        test('should type in message textarea', async () => {
            const message = await page.writeMessage();

            expect(message).toBe(expectedMessage);
        });

        test('clicking create note should create note and display it', async () => {
            const note = await page.createNote();

            expect(note.title).toBe(expectedTitle);
            expect(note.message).toBe(expectedMessage);
        });

        test('creating note should display on the notes-list', async () => {
            const note = await page.createNote();
            const noteOnList = JSON.parse((await page.getNewestNote()));
            
            expect(String(noteOnList.id)).toBe(note.id);
            expect(noteOnList.title).toBe(expectedTitle);
            expect(noteOnList.message).toBe(expectedMessage);
        });
    });
});