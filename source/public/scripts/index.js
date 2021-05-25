const todosData = [
    {
        created: '2021-05-20',
        duedate: '2021-06-01',
        title: 'Title of the Todo',
        description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et delectus vel dolorum ullam laborum blanditiis praesentium quo quia sit!',
        done: false,
        importance: 5,
    },
    {
        created: '2021-05-20',
        duedate: '2021-06-01',
        title: 'Title of the Todo',
        description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et delectus vel dolorum ullam laborum blanditiis praesentium quo quia sit!',
        done: false,
        importance: 5,
    },
];

// Render all ToDos
// DOM Elements
const todoElement = document.querySelector('.todos-list');
// Create HTML String of all Todos for Rendering
function createTodosHtml(todos) {
    return todos.map((todo) => `<li class="todo">
                                    <div class="check"></div>
                                    <div class="todo-content">
                                        <div class="meta">
                                            <small class="todo-createddate todo-meta"><span class="material-icons">edit_calendar</span>${todo.created}</small>
                                            <small class="todo-duedate todo-meta"><span class="material-icons">event_available</span>${todo.duedate}</small>
                                            <small class="todo-importance todo-meta"><span class="material-icons">priority_high</span></small>
                                        </div>
                                        <h2 class="todo-title">${todo.title}</h2>
                                        <p class="todo-desc">${todo.description}</p>
                                        <div class="todo-buttons">
                                            <button class="todo-edit"><span class="material-icons">edit</span></button>
                                            <button class="todo-edit"><span class="material-icons">done</span></button>
                                        </div>
                                    </div>
                                </li>`).join('');
}
// Attache HTML String to DOM-Element
function renderTodos() {
    const todoHtml = createTodosHtml(todosData);
    todoElement.innerHTML = todoHtml;
}
// Call Render Function to actually Render the content
renderTodos();
