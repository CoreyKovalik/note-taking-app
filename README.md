# Simple note taking app

### Install

run `npm install`

`cd` into /backend and /frontend

run `npm install` in both directories

### How to use the app:

In each directory, you can:

> Run: `npm run start`

> Test: `npm run dev` then `npm run test`

These commands remain the same in either directory, /backend or /frontend:

> Launch entire app with 'concurrently':  `npm run dev`

>> Run backend: `npm run backend`

>> Run frontend: `npm run frontend`

You can optionally build the React front-end with `npm run build`

### app includes:

 - __ExpressJS__ backend API that uses a mock note taking database
    - `localhost:8080/api`
    - `util/notes.js` acts as a database

 - __JavaScript__ tests with __Jest__ testing framework
    - uses `supertest` to make requests
 - __React__ frontend single page app
    - `localhost:3000`
    - interfaces with express backend API
    - functionality includes creating, reading, updating, and deleting of notes.
 - __Selenium__ tests the frontend UI
    - uses `selenium-webdriver`
    - `selenium-webdriver` and `jest` working together

<img src="https://raw.githubusercontent.com/CoreyKovalik/note-taking-app/master/app-example.png" width="800">

```
note-taking-app/
├── app-example.png
├── package-lock.json
├── package.json
├── README.md
├── /backend/
│  ├── .gitignore
│  ├── app.js
│  ├── homework-sse.md
│  ├── package-lock.json
│  ├── package.json
│  ├── README.md
│  ├── /routes/
│  │  ├── index.js
│  │  └── /notes/
│  │     ├── all-notes.js
│  │     ├── index.js
│  │     └── single-note.js
│  ├── server.js
│  ├── /test/
│  │  ├── jest.config.js
│  │  ├── jest.setup.js
│  │  └── /notes/
│  │     ├── all-notes.test.js
│  │     └── single-note.test.js
│  └── /utils/
│     ├── more-notes.js
│     └── notes.js
└── /frontend/
   ├── .gitignore
   ├── mock.png
   ├── package-lock.json
   ├── package.json
   ├── /public/
   │  ├── favicon.ico
   │  ├── index.html
   │  └── manifest.json
   ├── README.md
   └── /src/
      ├── App.css
      ├── App.js
      ├── /css/
      │  └── skeleton.css
      ├── /Display/
      │  ├── Display.css
      │  ├── Display.js
      │  ├── /FullNote/
      │  │  ├── /EditNote/
      │  │  │  ├── EditNote.css
      │  │  │  └── EditNote.js
      │  │  ├── FullNote.css
      │  │  └── FullNote.js
      │  └── /NewNote/
      │     ├── NewNote.css
      │     └── NewNote.js
      ├── index.css
      ├── index.js
      ├── /NoteSidebar/
      │  ├── NoteSidebar.css
      │  ├── NoteSidebar.js
      │  └── /NotesList/
      │     ├── NotesList.css
      │     └── NotesList.js
      ├── polyfill.js
      ├── /test/
      │  ├── /config/
      │  │  └── selenium-config.js
      │  ├── /e2e/
      │  │  ├── delete-notes.test.js
      │  │  ├── modify-notes.test.js
      │  │  ├── newnote.test.js
      │  │  └── note-taking-app.test.js
      │  └── /lib/
      │     ├── base-page.js
      │     ├── delete-notes.js
      │     ├── modify-notes.js
      │     └── newnote-page.js
      └── /utils/
         └── notes-api-helpers.js
```