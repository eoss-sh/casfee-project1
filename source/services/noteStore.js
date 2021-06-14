import Datastore from 'nedb-promise';
import Note from './note.js';

export default class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './source/data/notes_new.db', autoload: true});
    }

    async all() {
        const notes = await this.db.find({done:false});
        return notes;
    }

    async get(id) {
        const note = await this.db.findOne({_id: id});
        return note;
    }

    // [Question: Kann man das ohne return await lösen? Warum macht man das so?]
    async add(title, description, dueDate, importance) {
            const note = new Note(title, description, dueDate, importance);
            return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {done: true}});
    }
}

export const noteStore = new NoteStore();
