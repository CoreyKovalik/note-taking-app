const Page = require('../lib/delete-notes');
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

        test('should render a delete button when selecting a note', async () => {
            await page.selectRandomNote();
            const deleteButton = await page.getDeleteButton();
            
            let actual = await deleteButton.getText();
            
            let expected = "DELETE";
            expect(actual).toBe(expected);

            actual = await deleteButton.isEnabled();
            expect(actual).toBe(true);
        });

        test('should be confirm/cancel buttons after clicking delete', async () => {
            await page.selectRandomNote();
            await page.clickDeleteButton();

            let button = await page.getConfirmDeleteButton();
            let actual = await button.getText();
            let expected = "DELETE";
            expect(actual).toBe(expected);

            actual = await button.isEnabled();
            expect(actual).toBe(true);

            button = await page.getCancelDeleteButton();
            actual = await button.getText();
            expected = "CANCEL";
            expect(actual).toBe(expected);

            actual = await button.isEnabled();
            expect(actual).toBe(true);
        });

        test('should hide confirm/cancel after clicking cancel', async () => {
            await page.selectRandomNote();
            await page.clickDeleteButton();
            await page.clickCancelButton();

            const deleteButton = await page.checkForDeleteButton();
            expect(deleteButton).toBe(false);
        });

        test('should delete a note after clicking delete', async () => {
            await page.selectRandomNote();
            await page.clickDeleteButton();

            const initalFullNote = await page.getFullNote();
            const initialTotal = await page.countTotalNotes();

            await page.clickConfirmButton();

            const resultFullNote = await page.getFullNote();
            const resultTotal = await page.countTotalNotes();

            expect(resultTotal).toBe(initialTotal - 1);
            expect(resultFullNote.id).not.toBe(initalFullNote.id);
        });
    });
});