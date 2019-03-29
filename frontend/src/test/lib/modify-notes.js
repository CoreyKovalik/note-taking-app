const Page = require('./newnote-page');

class ModifyNotes extends Page {
    constructor() {
        super();
        this.title = 'Selenium Test Editted Title';
        this.message = 'Selenium Test Editted Message Body -- Lorem Ispum';        
    }

    async getRandomNote() {
        const notes = await this.findAll('[data-test-notes]');
        const randomNote = Math.floor(Math.random() * notes.length);
        const note = notes[randomNote]
        return note;
    }

    async selectRandomNote() {
        const element = await this.getRandomNote();
        element.click();
        return element.getAttribute('data-note');
    }

    async getEditButton() {
        const editButton = await this.find('[data-test~=button-editnote]');
        return editButton;
    }

    async clickEditButton() {
        const editButton = await this.getEditButton();
        return editButton.click();
    }

    async visibleEditForm() {
        await this.clickEditButton();
        const element = await this.find('[data-test~=form-editnote]');
        return element;
    }

    async getUpdateTitle() {
        const textarea = '[data-test~=form-editnote-textarea-title]';
        return this.find(textarea);        
    }

    async getUpdateMessage() {
        const textarea = '[data-test~=form-editnote-textarea-message]';
        return this.find(textarea);        
    }

    async updateTitle() {
        const textarea = '[data-test~=form-editnote-textarea-title]';
        await this.selectAllText(textarea);
        this.write(textarea, this.title);

        const element = await this.find(textarea);
        return element.getAttribute('value');        
    }

    async updateMessage() {
        const textarea = '[data-test~=form-editnote-textarea-message]';
        await this.selectAllText(textarea);
        this.write(textarea, this.message);

        const element = await this.find(textarea);
        return element.getAttribute('value');        
    }

    async clickUpdateButton() {
        const updateButton = await this.find('[data-test~=form-editnote-input-button-updatenote]');
        return updateButton.click();
    }

    async updateNote() {
        await this.updateTitle();
        await this.updateMessage();
        await this.clickUpdateButton();
    }
    
}
module.exports = ModifyNotes;