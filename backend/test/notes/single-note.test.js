const app = require('../../app');
const request = require('supertest');

const { Store, Note } = require('../../utils/notes');

describe('test single-note router', () => {
    beforeEach(() => {
        this.newTestNote = function() {
            newNote = new Note('This newNote', 'is made for testing');
            Store.writeNote(newNote)
            return newNote;
        }
        this.actualKeys = ["id", "createdAt", "updatedAt", "title", "message"];
    });

    describe('GET the /notes/:noteid path', () => {
        test('should get a note by id', async () => {
            const testNote = this.newTestNote();

            const response = await request(app).get('/api/notes/' + testNote.id);
            const gotNote = response.body;
            
            expect(response.statusCode).toBe(200);
            expect(gotNote.id).toBe(testNote.id);
        });

        test('should throw error if id does not exist', async () => {
            const noteid = 'n0n53n53';
            const response = await request(app).get('/api/notes/' + noteid);

            expect(response.error.text).toMatch(`id ${noteid} does not exist`);
            expect(response.statusCode).toBe(400);
        });
    });


    describe('PUT the /notes/:noteid path', () => {
        test('should update a note\'s title and message, then return the updated note', async () => {
            const testNote = this.newTestNote();

            const response = await request(app).put('/api/notes/' + testNote.id)
                .set('Content-Type', 'application/json')
                .send({"title":"jest", "message":"test-PUT"});

            const updatedNote = response.body;


            expect(response.statusCode).toBe(200);
            expect(Store.getNote(testNote.id))
                .toMatchObject({"title":"jest", "message":"test-PUT"})
            expect(updatedNote)
                .toHaveProperty('id', testNote.id)
                .toBeObject()
                .toMatchObject({"title":"jest", "message":"test-PUT"})
                .toContainAllKeys(this.actualKeys);
        });

        test('should update a note`s title only', async () => {
            const testNote = this.newTestNote();

            const response = await request(app).put('/api/notes/' + testNote.id)
                .set('Content-Type', 'application/json')
                .send('{"title":"jest"}');
            const updatedNote = response.body;

            expect(response.statusCode).toBe(200);
            expect(updatedNote)
                .toHaveProperty('id', testNote.id)
                .toBeObject()
                .toMatchObject({"title":"jest"})
                .toContainAllKeys(this.actualKeys);
        });        

        test('should update a note`s message only', async () => {
            const testNote = this.newTestNote();

            const response = await request(app).put('/api/notes/' + testNote.id)
                .set('Content-Type', 'application/json')
                .send('{"message":"test-PUT"}');
            const updatedNote = response.body;

            expect(response.statusCode).toBe(200);
            expect(updatedNote)
                .toHaveProperty('id', testNote.id)
                .toBeObject()
                .toMatchObject({"message":"test-PUT"})
                .toContainAllKeys(this.actualKeys);        
        });
    });


    describe('DELETE the /notes/:noteid path', () => {
        test('should delete a note by id and return nothing', async () => {
            const testNote = this.newTestNote();
            
            const response = await request(app).delete('/api/notes/' + testNote.id);

            expect(response.statusCode).toBe(204);
            expect(response.body).toBeEmpty();
            expect(Store.getNote(testNote.id)).toBeNull();
        });

        test('api should throw error if id does not exist', async () => {
            const noteid = 'n0n53n53';
            const response = await request(app).delete('/api/notes/' + noteid);

            expect(response.statusCode).toBe(400);
            expect(Store.getNote(noteid)).toBeNull();
            expect(response.error.text).toMatch(`No note with id ${noteid}`);
        })
    })


});