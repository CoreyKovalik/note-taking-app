const Page = require('../lib/base-page.js');
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

    describe('test if the initial landing page renders', () => {

        test('should be 5 data-test elements located', async () => {
            const elements = await page.findAll("[data-test]");
            
            let actual = elements.length;
            expect(actual).toBe(6);
        });

        test.only('should be least 1 note rendered in the notes list', async () => {
            const elements = await page.findAll("[data-test-notes^=id-]");

            let actual = elements.length;
            expect(actual).toBeGreaterThanOrEqual(1);
        });

        test('should render a new note button', async () => {
            const newNoteButton = await page.find("[data-test~=button-newnote]");

            let actual = await newNoteButton.getText();
            let expected = "NEW";
            expect(actual).toBe(expected);

            actual = await newNoteButton.isEnabled()
            expect(actual).toBe(true);
        });


        describe('test if newNote form elements render', () => {

            test('title textarea renders', async () => {
                const titleTextArea = await page.find("[data-test^=form-newnote-]");

                let actual = await titleTextArea.getText();
                expect(actual).toBe("A new note title");

                actual = await titleTextArea.isEnabled();
                expect(actual).toBe(true);
            });

            test('message textarea renders', async () => {
                const messageTextArea = await page.find("[data-test~=form-newnote-textarea-message]");

                let actual = await messageTextArea.getText();
                expect(actual).toBe("Message body for the new note");

                actual = await messageTextArea.isEnabled();
                expect(actual).toBe(true);
            });

            test('create note button renders', async () => {
                const createNoteButton = await page.find("[data-test~=form-newnote-input-button-createnote]");

                let actual = await createNoteButton.getAttribute("value");
                expect(actual).toBe("Create Note");

                actual = await createNoteButton.isEnabled();
                expect(actual).toBe(true);
            });
        });
    });
});