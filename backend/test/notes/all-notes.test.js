const app = require('../../app');
const request = require('supertest');

const { Store, Note } = require('../../utils/notes');

describe('test all-notes router', () => {

    describe('GET the /notes path', () => {
        test('should return an object with all the notes', async () => {
            const response = await request(app).get('/api/notes');

            expect(response.statusCode).toBe(200);
            expect(response.body).toBeArray()
            expect(response.body[0])
                .not.toBeEmpty()
                .toBeObject()
                .toContainAllKeys(["id", "createdAt", "updatedAt", "title", "message"]);
        });
    });

   describe('POST the /notes path', () => {
        test('should create a note and return the new note', async () => {
            const response = await request(app).post('/api/notes')
                .set('Content-Type', 'application/json')
                .send('{"title":"jest", "message":"test-POST"}');

            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject({"title":"jest", "message":"test-POST"});
            expect(Store.getNote(response.body.id)).not.toBeEmpty();
        });

        test('should throw an error if title/message not provided', async () => {
            const response = await request(app).post('/api/notes');

            expect(response.error.text).toMatch("title and message require content");
            expect(response.statusCode).toBe(400);
        });

        test('should throw an error if message not provided', async () => {
            const response = await request(app).post('/api/notes')
                .set('Content-Type', 'application/json')
                .send('{"title":"only title, no message"}');

            expect(response.error.text).toMatch("title and message require content");
            expect(response.statusCode).toBe(400);
        });

        test('should throw an error if title not provided', async () => {
            const response = await request(app).post('/api/notes')
                .set('Content-Type', 'application/json')
                .send('{"message":"only message, no title"}');

            expect(response.error.text).toMatch("title and message require content");
            expect(response.statusCode).toBe(400);
        });
    });    
});