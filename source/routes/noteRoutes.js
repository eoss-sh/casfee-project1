import express from 'express';
import { notesController } from '../controller/notesController.js';

const router = express.Router();

router.post('/', notesController.createNote.bind(notesController));
router.get('/', notesController.loadNotes.bind(notesController));
router.delete('/:id', notesController.deleteNote.bind(notesController));
router.get('/:id', notesController.getNote.bind(notesController));

export const noteRoutes = router;
