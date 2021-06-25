import express from 'express';
import { notesController } from '../controller/notesController.js';

const router = express.Router();

router.post('/', notesController.createNote);
router.get('/', notesController.loadNotes);
router.post('/:id', notesController.toggleDone);
router.get('/:id', notesController.getNote);
router.put('/:id', notesController.updateNote);

export const noteRoutes = router;
