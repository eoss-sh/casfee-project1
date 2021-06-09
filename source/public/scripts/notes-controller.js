import { notesService } from './services/notes-service.js';
import { todoElement, renderTodos } from './views/notes-view.js';

// DOM Elements
const sortByCreated = document.querySelector('.sort-date');
const sortByDue = document.querySelector('.sort-due');
const sortByImportance = document.querySelector('.sort-importance');
const onlyOpen = document.querySelector('input[name=filterdswitch-completed]');
const addNewButton = document.querySelector('.add-note__submit');
const openNewNoteOverlay = document.querySelector('.add-new');
const newNoteOverlay = document.querySelector('.add-note');
const darkMode = document.querySelector('.layoutswitch-darkmode');
const gridMode = document.querySelector('.layoutswitch-grid');

// Add new Note
// Open Overlay
openNewNoteOverlay.addEventListener('click', () => {
    newNoteOverlay.classList.toggle('active');
    openNewNoteOverlay.classList.toggle('rotate');
});
// Add note Button
addNewButton.addEventListener('click', (e) => {
    e.preventDefault();
    const note = {
        title: document.getElementById('new-note__titel').value,
        description: document.getElementById('new-note__desc').value,
        dueDate: new Date(document.getElementById('new-note__duedate').value),
        importance: document.getElementById('new-note__importance').value,
    };
    notesService.addNote(10, note.title, note.description, note.dueDate, note.importance);
    renderTodos(notesService.notes);
    newNoteOverlay.classList.remove('active');
    openNewNoteOverlay.classList.remove('rotate');
});
// Call Render Function to actually Render the content
// Set Todo to complete and rerender todos (default done todos = hidden)
// Handle Function
// Should this be moved to services file??
function handleDoneClick(e) {
    if (e.target.matches('.todo-done')) {
        // eslint-disable-next-line max-len
        const currentToDo = notesService.notes.find((todo) => todo.id === e.target.parentElement.dataset.id);
        if (currentToDo.done) {
            currentToDo.done = false;
        } else {
            currentToDo.done = true;
        }
        e.target.parentElement.parentElement.parentElement.classList.toggle('done');
    }
}

// Add Eventlistenerses
// Handle Done Click
todoElement.addEventListener('click', handleDoneClick);

// Handle Sorting
sortByCreated.addEventListener('click', () => {
    renderTodos(notesService.toDosSortedCreated());
});
sortByDue.addEventListener('click', () => {
    renderTodos(notesService.toDosSortedDue());
});
sortByImportance.addEventListener('click', () => {
    renderTodos(notesService.toDosSortedImportance());
});
onlyOpen.addEventListener('change', (e) => {
    if (e.target.checked) {
        renderTodos(notesService.toDosOnlyOpen());
    } else {
        renderTodos(notesService.notes);
    }
});

// Layout Switcher
darkMode.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
gridMode.addEventListener('change', () => {
    document.body.classList.toggle('grid-mode');
});

function init() {
    notesService.loadNotes();
    renderTodos(notesService.notes);
}

init();
