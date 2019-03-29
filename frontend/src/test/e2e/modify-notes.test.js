const Page = require('../lib/modify-notes');
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

    describe('test selecting notes in notesList', () => {
        let expectedTitle = 'Selenium Test Editted Title';
        let expectedMessage = 'Selenium Test Editted Message Body -- Lorem Ispum';

        test('clicking any note should display a matching FullNote', async () => {
            const note = JSON.parse((await page.selectRandomNote()));
            const fullNote = await page.getFullNote();

            expect(note.title).toBe(fullNote.title);
            expect(String(note.id)).toBe(fullNote.id);

        });

        test('should be an edit button when selecting a note', async () => {
            await page.selectRandomNote();
            const editButton = await page.getEditButton();
            
            let actual = await editButton.getText();
            
            let expected = "EDIT";
            expect(actual).toBe(expected);

            actual = await editButton.isEnabled();
            expect(actual).toBe(true);
        });

        test('should display edit form when edit button is clicked', async () => {
            await page.selectRandomNote();
            const element = await page.visibleEditForm();

            expect(Boolean(element)).toBe(true);
        });

        test('textareas should match current note', async () => {
            await page.selectRandomNote();
            await page.visibleEditForm();
            const fullNote = await page.getFullNote();

            let textareaTitle = await page.getUpdateTitle();
            let textareaMessage = await page.getUpdateMessage();

            
            let actual = await textareaTitle.getText();
            expect(actual).toBe(fullNote.title);

            actual = await textareaMessage.getText();
            expect(actual).toBe(fullNote.message);
        });


        test('should type in textareas', async () => {
            await page.selectRandomNote();
            await page.visibleEditForm();
            const title = await page.updateTitle();
            const message = await page.updateMessage();

            expect(title).toBe(expectedTitle);
            
            expect(message).toBe(expectedMessage);
        });

        test('should update fullNote contents', async () => {
            await page.selectRandomNote();
            await page.visibleEditForm();
            await page.updateNote();
            const fullNote = await page.getFullNote();

            expect(fullNote.title).toBe(expectedTitle);
            expect(fullNote.message).toBe(expectedMessage);
        });
    });
});