const Page = require('./modify-notes');

class DeleteNote extends Page {
    constructor() {
        super();       
    }

    async getDeleteButton() {
        const deleteButton = await this.find('[data-test~=button-deletenote]'); 
        return deleteButton;
    }

    async getConfirmDeleteButton() {
        const confirmButton = await this.find('[data-test~=button-confirm-deletenote]'); 
        return confirmButton;
    }

    async getCancelDeleteButton() {
        const cancelButton = await this.find('[data-test~=button-cancel-deletenote]'); 
        return cancelButton;
    }

    async clickDeleteButton() {
        const deleteButton = await this.getDeleteButton();
        deleteButton.click();
    }

    async clickCancelButton() {
        const cancelButton = await this.getCancelDeleteButton();
        cancelButton.click();
    }

    async clickConfirmButton() {
        const confirmButton = await this.getConfirmDeleteButton();
        confirmButton.click();
    }

    async checkForDeleteButton() {
        const visible = await this.checkExists('[data-test~=button-confirm-deletenote]');
        return visible;
    }

    async countTotalNotes() {
        let total = await this.findAll('[data-test-notes]');
        total = total.length;
        return total;
    }
}
module.exports = DeleteNote;