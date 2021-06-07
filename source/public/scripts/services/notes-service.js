import NoteStorage from './data/note-storage.js';
import Note from './note.js';

export default class NotesService {
    constructor() {
        this.storage = new NoteStorage();
        this.notes = [];
    }

    loadNotes() {
        this.notes = this.storage.getNotes().map((n) => new Note(n.id, n.title, n.description, n.dueDate, n.importance));
    }

    addNote(id, title, description, dueDate, importance) {
        const newNote = new Note(id, title, description, dueDate, importance);
        this.notes.push(newNote);
    }

    toDosSortedCreated() {
        const sortedByCreated = this.notes.sort((todo1, todo2) => todo1.created - todo2.created);
        return sortedByCreated;
    }

    toDosSortedDue() {
        const sortedByDue = this.notes.sort((todo1, todo2) => todo1.duedate - todo2.duedate);
        return sortedByDue;
    }

    toDosSortedImportance() {
        const sortedByImportance = this.notes.sort((todo1, todo2) => todo2.importance - todo1.importance);
        return sortedByImportance;
    }

    toDosOnlyOpen() {
        const onlyOpen = this.notes.filter((todo) => todo.done === false);
        return onlyOpen;
    }
}

export const notesService = new NotesService();
