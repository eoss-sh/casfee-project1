// Dom Elements
export const todoElement = document.querySelector('.todos-list');

// Render all ToDos
// Create HTML String of all Todos for Rendering
function createTodosHtml(todos) {
    return todos.map((todo) => `<li class="todo" data-done="${todo.done}">
                                    <div class="check"></div>
                                    <div class="todo-content">
                                        <div class="meta">
                                            <small class="todo-createddate todo-meta"><span class="material-icons">edit_calendar</span>${dayjs(todo.createdDate).format('DD.MM.YYYY')}</small>
                                            <small class="todo-duedate todo-meta"><span class="material-icons">event_available</span>${dayjs(todo.dueDate).format('DD.MM.YYYY')}</small>
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
export function renderTodos(data) {
    const todoHtml = createTodosHtml(data);
    todoElement.innerHTML = '';
    todoElement.innerHTML = todoHtml;
}
