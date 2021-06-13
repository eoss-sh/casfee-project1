import { noteStore } from '../services/noteStore.js';

export class NotesController {
    async createNote(req, res) {
        console.log(req);
        res.json(await noteStore.add(req.body.title, req.body.description, req.body.dueDate, req.body.importance));
    }

    async loadNotes(req, res) {
        res.json(await noteStore.all());
    }
}

export const notesController = new NotesController();
