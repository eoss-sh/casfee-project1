import {httpService} from './http-service.js';

export default class NotesService {
    constructor() {
        this.notes = [];
    }

    async getNotes() {
        const fetchResponse = await httpService.ajax('GET', '/notes', undefined);
        return fetchResponse;
    }

    async getNote(id) {
        const fetchResponse = await httpService.ajax('GET', `/notes/${id}`, undefined);
        return fetchResponse;
    }

    async addNote(id, title, description, dueDate, importance) {
        const fetchResponse = await httpService.ajax('POST', '/notes', {title, description, dueDate, importance});
        return fetchResponse;
    }

    async deleteNote(id) {
        const fetchResponse = await httpService.ajax('DELETE', `/notes/${id}`, undefined);
        return fetchResponse;
    }

    updateNote(id, title, description, dueDate, importance){
        const noteToUpdate = this.notes.find(note => note.id == id);
        noteToUpdate.title = title;
        noteToUpdate.description = description;
        noteToUpdate.dueDate = dueDate;
        noteToUpdate.importance = importance;
        console.log(this.notes);
    }

    toDosSortedCreated() {
        const sortedByCreated = this.notes.sort((todo1, todo2) => dayjs(todo1.created).unix() - dayjs(todo2.created).unix());
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
