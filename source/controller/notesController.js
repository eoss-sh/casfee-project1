import { noteStore } from '../services/noteStore.js';

export class NotesController {
    async createNote(req, res) {
        res.json(await noteStore.add(req.body.title, req.body.description, req.body.dueDate, req.body.importance));
    }

    async deleteNote(req, res) {
        res.json(await noteStore.delete(req.params.id));
    }

    async loadNotes(req, res) {
        res.json(await noteStore.all());
    }

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    }
}

export const notesController = new NotesController();
