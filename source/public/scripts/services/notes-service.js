import {httpService} from './http-service.js';

export default class NotesService {
    constructor() {
        this.notes = [];
    }

    async getNotes(showDone, sortMethode) {
        const fetchResponse = await httpService.ajax('GET', `/notes?done=${showDone}&sorting=${sortMethode}`, undefined);
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

    async updateNote(id, title, description, dueDate, importance){
        const fetchResponse = await httpService.ajax('PUT', `/notes/${id}`, {title, description, dueDate, importance});
        return fetchResponse;
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
