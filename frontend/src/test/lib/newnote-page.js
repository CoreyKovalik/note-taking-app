const Page = require('./base-page');

class NewNotePage extends Page {
    constructor() {
        super();
        this.title = 'Selenium Test Title';
        this.message = 'Selenium Test Message Body -- Lorem Ispum';
    }

    async writeTitle() {
        const textarea = '[data-test~=form-newnote-textarea-title]';

        await this.selectAllText(textarea);
        this.write(textarea, this.title);

        const element = await this.find(textarea);
        return element.getAttribute('value');
    }

    async writeMessage() {
        const textarea = '[data-test~=form-newnote-textarea-message]';

        await this.selectAllText(textarea);
        this.write(textarea, this.message);

        const element = await this.find(textarea);
        return element.getAttribute('value');
    }

    async clickCreateNote() {
        const element = '[data-test~=form-newnote-input-button-createnote]';
        const button = await this.find(element)
        button.click();
    }

    async createNote() {
        await this.writeTitle();
        await this.writeMessage();
        await this.clickCreateNote();
        return await this.getFullNote();
    }

    async getFullNoteTitle() {
        const element = await this.find("[data-test~=full-note-title]");
        return element.getText()
    }

    async getFullNoteMessage() {
        const element = await this.find("[data-test~=full-note-message]");
        return element.getText()        
    }

    async getFullNoteID() {
        const element = await this.find("[data-test^=full-note-id-]");
        return element.getAttribute('data-test');
    }

    async getFullNote() {
        const note = {};
        note.title = await this.getFullNoteTitle();
        note.message = await this.getFullNoteMessage();
        note.id = await this.getFullNoteID();
        note.id = note.id.replace('full-note-id-','');
        return note;
    }

    async getNewestNote() {
        const elements = await this.findAll("[data-test-notes]");
        let noteElement = elements[elements.length - 1];
        return noteElement.getAttribute('data-note');
    }
}

module.exports = NewNotePage;