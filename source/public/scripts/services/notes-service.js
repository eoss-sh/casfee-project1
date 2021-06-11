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
    updateNote(id, title, description, dueDate, importance){
        const noteToUpdate = this.notes.find(note => note.id == id)
        noteToUpdate.title = title;
        noteToUpdate.description = description;
        noteToUpdate.dueDate = dueDate;
        noteToUpdate.importance = importance;
        console.log(this.notes);
    }

    toDosSortedCreated() {
        const sortedByCreated = this.notes.sort((todo1, todo2) => dayjs(todo1.created).unix() - dayjs(todo2.created).unix());
        console.log('hi')
        return sortedByCreated;
    }

    toDosSortedDue() {
        const sortedByDue = this.notes.sort((todo1, todo2) => dayjs(todo1.dueDate).unix() - dayjs(todo2.dueDate).unix());
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
