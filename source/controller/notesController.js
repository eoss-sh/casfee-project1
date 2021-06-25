import { noteStore } from '../services/noteStore.js';

// [Question / Refactor: Put req. arguments in constructor?]
export class NotesController {
    async createNote(req, res) {
        res.json(await noteStore.add(req.body.title, req.body.description, req.body.dueDate, req.body.importance));
    }

    async toggleDone(req, res) {
        res.json(await noteStore.done(req.params.id, req.body.done));
    }

    async loadNotes(req, res) {
        res.json(await noteStore.all(req.query.done, req.query.sorting));
    }

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    }

    async updateNote(req, res) {
        res.json(await noteStore.update(req.params.id, req.body.title, req.body.description, req.body.dueDate, req.body.importance));
    }
}

export const notesController = new NotesController();
