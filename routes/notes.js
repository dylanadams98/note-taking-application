const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');


notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.tip_id === tipId);
            return result.length > 0
            ? res.json(result)
            : res.json('Note not found');
        });
    });

notes.delete('/notes', (req, res) => {
        const noteId = req.params.note_id;
        readFromFile('./db/db.json')
            .then((data) => JSON.parse(data))
            .then((json) => {
                const result = json.filter((note) => note.id !== noteId);
                writeToFile('./db/db.json', result);

                res.json(`Item ${noteId} has been deleted!`);
            });
});

notes.post('/', (req,res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            test,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully!`);
    } else {
        res.error(`Please provide a title and text`);
    }
});

module.exports = notes;