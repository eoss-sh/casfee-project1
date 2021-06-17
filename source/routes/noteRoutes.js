import express from 'express';
import { notesController } from '../controller/notesController.js';

const router = express.Router();

router.post('/', notesController.createNote);
router.get('/', notesController.loadNotes);
router.delete('/:id', notesController.deleteNote);
router.get('/:id', notesController.getNote);
router.put('/:id', notesController.updateNote);

export const noteRoutes = router;
