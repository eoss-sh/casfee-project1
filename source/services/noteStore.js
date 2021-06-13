import Datastore from 'nedb-promise';
import Note from './note.js';

export default class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './source/data/notes.db', autoload: true});
    }

    async all() {
        const notes = await this.db.find({});
        return notes;
    }

    // [Question: Kann man das ohne return await lösen? Warum macht man das so?]
    async add(title, description, dueDate, importance) {
            const note = new Note(title, description, dueDate, importance);
            return await this.db.insert(note);
        }
}

export const noteStore = new NoteStore();
