const todosData = [
    {
        id: '1',
        created: new Date('2020-05-20'),
        duedate: new Date('2021-06-01'),
        title: 'Title of the first Note',
        description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et delectus vel dolorum ullam laborum blanditiis praesentium quo quia sit!',
        done: false,
        importance: 5,
    },
    {
        id: '2',
        created: new Date('2021-05-20'),
        duedate: new Date('2021-01-01'),
        title: 'Title of the second Note',
        description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et delectus vel dolorum ullam laborum blanditiis praesentium quo quia sit!',
        done: false,
        importance: 5,
    },
];
// DOM Elements
const todoElement = document.querySelector('.todos-list');
const sortByCreated = document.querySelector('.sort-date');
const sortByDue = document.querySelector('.sort-due');
// All Sorted Arrays for different Filters
// Standard - created date
function toDosSortedCreated() {
    const sortedByCreated = todosData.sort((todo1, todo2) => todo1.created - todo2.created);
    return sortedByCreated;
}
// Standard - due date
function toDosSortedDue() {
    const sortedByDue = todosData.sort((todo1, todo2) => todo1.duedate - todo2.duedate);
    return sortedByDue;
}
// Render all ToDos

// Create HTML String of all Todos for Rendering
function createTodosHtml(todos) {
    return todos.map((todo) => `<li class="todo" data-done="${todo.done}">
                                    <div class="check"></div>
                                    <div class="todo-content">
                                        <div class="meta">
                                            <small class="todo-createddate todo-meta"><span class="material-icons">edit_calendar</span>${todo.created}</small>
                                            <small class="todo-duedate todo-meta"><span class="material-icons">event_available</span>${todo.duedate}</small>
                                            <small class="todo-importance todo-meta"><span class="material-icons">priority_high</span></small>
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
// Call Render Function to actually Render the content
renderTodos(todosData);
// Set Todo to complete and rerender todos (default done todos = hidden)
// Handle Function
function handleDoneClick(e) {
    if (e.target.matches('.todo-done')) {
        const currentToDo = todosData.find((todo) => todo.id === e.target.parentElement.dataset.id);
        if (!currentToDo.done) {
            currentToDo.done = true;
        }
        e.target.parentElement.parentElement.classList.add('done');
    }
}
// Sorting Functions
// Created Date
function handleSortCreated() {
    const data = toDosSortedCreated();
    renderTodos(data);
}
// Due Date
function handleSortDue() {
    const data = toDosSortedDue();
    renderTodos(data);
}
// Add Eventlisteners
// Handle Done Click
todoElement.addEventListener('click', handleDoneClick);
// Handle Sorting
sortByCreated.addEventListener('click', handleSortCreated);
sortByDue.addEventListener('click', handleSortDue);
