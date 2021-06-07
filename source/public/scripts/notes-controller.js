import { notesService } from './services/notes-service.js';
// DOM Elements
const todoElement = document.querySelector('.todos-list');
const sortByCreated = document.querySelector('.sort-date');
const sortByDue = document.querySelector('.sort-due');
const sortByImportance = document.querySelector('.sort-importance');
const onlyOpen = document.querySelector('input[name=filterdswitch-completed]');
const addNewButton = document.querySelector('.add-note__submit');

// Render all ToDos
// Create HTML String of all Todos for Rendering
function createTodosHtml(todos) {
    return todos.map((todo) => `<li class="todo" data-done="${todo.done}">
                                    <div class="check"></div>
                                    <div class="todo-content">
                                        <div class="meta">
                                            <small class="todo-createddate todo-meta"><span class="material-icons">edit_calendar</span>${todo.createdDate}</small>
                                            <small class="todo-duedate todo-meta"><span class="material-icons">event_available</span>${todo.dueDate}</small>
                                            <small class="todo-importance todo-meta"><span class="material-icons">priority_high</span>${todo.importance}</small>
                                        </div>
                                        <h2 class="todo-title">${todo.title}</h2>
                                        <p class="todo-desc">${todo.description}</p>
                                        <div class="todo-buttons" data-id="${todo.id}">
                                            <button class="todo-edit"><span class="material-icons">edit</span></button>
                                            <button class="todo-done"><span class="material-icons">done</span></button>
                                        </div>
                                    </div>
                                </li>`).join('');
}
// Attache HTML String to DOM-Element
function renderTodos(data) {
    const todoHtml = createTodosHtml(data);
    todoElement.innerHTML = '';
    todoElement.innerHTML = todoHtml;
}
// Add new Note
addNewButton.addEventListener('click', (e) => {
    e.preventDefault();
    const note = {
        title: document.getElementById('new-note__titel').value,
        description: document.getElementById('new-note__desc').value,
        dueDate: new Date(document.getElementById('new-note__duedate').value),
    };
    notesService.addNote(10, note.title, note.description, note.dueDate, 5);
    renderTodos(notesService.notes);
});
// Call Render Function to actually Render the content
// Set Todo to complete and rerender todos (default done todos = hidden)
// Handle Function
// Should this be moved to services file??
function handleDoneClick(e) {
    if (e.target.matches('.todo-done')) {
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

function init() {
    notesService.loadNotes();
    renderTodos(notesService.notes);
}

init();
