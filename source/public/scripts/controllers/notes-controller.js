import { notesService } from '../services/notes-service.js';
import { createTodosHtml } from '../views/notes-view.js';

// DOM Elements
// [Question: Ok that all Elements are collected at the top?]
const todoElement = document.querySelector('.todos-list');
const sortByCreated = document.querySelector('.sort-date');
const sortByDue = document.querySelector('.sort-due');
const sortByImportance = document.querySelector('.sort-importance');
const onlyOpen = document.querySelector('input[name=filterdswitch-completed]');
const addNewButton = document.querySelector('.add-note__submit');
const openNewNoteOverlay = document.querySelector('.add-new');
const newNoteOverlay = document.querySelector('.add-note');
const darkMode = document.querySelector('.layoutswitch-darkmode');
const gridMode = document.querySelector('.layoutswitch-grid');
const newNoteForm = document.querySelector('.add-note__form');

// Filter Variables Store
// Variable to Check if Deleted are shown => Default false
let showDeleted = false;
let sortOrder = 'createdDate';

// Render ToDos
// Attache HTML String to DOM-Element
async function renderNotes(showDone = showDeleted, sortMethode = sortOrder) {
    const notes = await notesService.getNotes(showDone, sortMethode);
    const todoHtml = await createTodosHtml(notes);
    todoElement.innerHTML = '';
    todoElement.innerHTML = todoHtml;
}

// Add new Note
// Open Overlay
openNewNoteOverlay.addEventListener('click', () => {
    newNoteOverlay.classList.toggle('active');
    openNewNoteOverlay.classList.toggle('rotate');
});
// "Add Note" Button Event Listener
addNewButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const titleValue = document.getElementById('new-note__titel').value;
    const descriptionValue = document.getElementById('new-note__desc').value;
    const dueDateValue = document.getElementById('new-note__duedate').value;
    const importanceValue = document.getElementById('new-note__importance').value;
    const note = {
        title: titleValue,
        description: descriptionValue,
        dueDate: new Date(dueDateValue),
        importance: importanceValue,
    };
    if (titleValue === '' || descriptionValue === '' || dueDateValue === '' || importanceValue === '') {
        const errorMessage = document.createElement('div');
        newNoteForm.insertBefore(errorMessage, newNoteForm.firstChild);
        errorMessage.innerHTML = `<p>Das Formular ist nicht vollständig ausgefüllt. Bitte prüfen Sie Ihre Eingabe.</p>`;
        setTimeout(() => { newNoteForm.removeChild(errorMessage); }, 3000);
    } else {
        await notesService.addNote(10, note.title, note.description, note.dueDate, note.importance);
        await renderNotes();
        newNoteOverlay.classList.remove('active');
        openNewNoteOverlay.classList.remove('rotate');
        newNoteForm.reset();
    };
});
// Delete Note
// Set State of Note to Delete and rerender Notes
todoElement.addEventListener('click', async (e) => {
    if (e.target.matches('.todo-done')) {
        const currentNoteId = e.target.parentElement.dataset.id;
            await notesService.deleteNote(currentNoteId);
            await renderNotes();
    }
});
// Edit of Single Note
// Open Edit-Mode of Single Note
todoElement.addEventListener('click', (e) => {
    if (e.target.matches('.todo-edit')) {
        e.target.parentElement.parentElement.parentElement.classList.toggle('edit');
    }
});
// Handle Update of Note
// [Question: Render looses filter => ok?]
todoElement.addEventListener('click', async (e) => {
    if (e.target.matches('.todo-save')) {
        const currentNote = e.target.parentElement.parentElement.parentElement;
        const {id} = e.target.parentElement.dataset;
        const title = currentNote.querySelector('.todo-title__edit').value;
        const description = currentNote.querySelector('.todo-desc__edit').value;
        const dueDate = currentNote.querySelector('.todo-duedate__edit').value;
        const importance = currentNote.querySelector('.todo-importance__edit').value;
        await notesService.updateNote(id, title, description, dueDate, importance);
        currentNote.classList.toggle('edit');
        await renderNotes();
    }
});

// Handle Sorting
sortByCreated.addEventListener('click', () => {
    sortOrder = 'createdDate';
    renderNotes(showDeleted, 'createdDate');
});
sortByDue.addEventListener('click', () => {
    sortOrder = 'duedDate';
    renderNotes(showDeleted, 'dueDate');
});
sortByImportance.addEventListener('click', () => {
    sortOrder = 'importance';
    renderNotes(showDeleted, 'importance');
});
onlyOpen.addEventListener('change', (e) => {
    if (e.target.checked) {
        showDeleted = true;
        renderNotes(showDeleted, sortOrder);
    } else {
        showDeleted = false;
        renderNotes(showDeleted, sortOrder);
    }
});

// Layout Switcher
darkMode.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
gridMode.addEventListener('change', () => {
    document.body.classList.toggle('grid-mode');
});

renderNotes();
