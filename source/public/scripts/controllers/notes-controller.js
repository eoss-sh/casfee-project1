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

// Render ToDos
// Attache HTML String to DOM-Element
async function renderNotes() {
    const notes = await notesService.getNotes();
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
// Add note Button
addNewButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const note = {
        title: document.getElementById('new-note__titel').value,
        description: document.getElementById('new-note__desc').value,
        dueDate: new Date(document.getElementById('new-note__duedate').value),
        importance: document.getElementById('new-note__importance').value,
    };
    await notesService.addNote(10, note.title, note.description, note.dueDate, note.importance);
    console.log('after add before render')
    await renderNotes();
    console.log('before render')
    newNoteOverlay.classList.remove('active');
    openNewNoteOverlay.classList.remove('rotate');
});
// Toggle class for done ToDos, look up affected ToDo and toogle the value of done for this Todo
// [Question]: Should this be moved to services file??
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
// Handle Done Click in calling handleDoneClick function
todoElement.addEventListener('click', handleDoneClick);
// Handle Edit of Single ToDo
todoElement.addEventListener('click', (e) => {
    if (e.target.matches('.todo-edit')) {
        e.target.parentElement.parentElement.parentElement.classList.toggle('edit');
    }
});
// Handle Update of ToDo
// [Question: Render looses filter => ok?]
todoElement.addEventListener('click', (e) => {
    if (e.target.matches('.todo-save')) {
        const currentNote = e.target.parentElement.parentElement.parentElement;
        const id = 1;
        const title = currentNote.querySelector('.todo-title__edit').value;
        const description = currentNote.querySelector('.todo-desc__edit').value;
        const dueDate = currentNote.querySelector('.todo-duedate__edit').value;
        const importance = currentNote.querySelector('.todo-importance__edit').value;
        notesService.updateNote(id, title, description, dueDate, importance);
        currentNote.classList.toggle('edit');
        renderTodos(notesService.notes);
    }
});

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

renderNotes();
