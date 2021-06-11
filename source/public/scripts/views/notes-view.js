// Dom Elements
export const todoElement = document.querySelector('.todos-list');

// Render all ToDos
// Create HTML String of all Todos for Rendering
function createTodosHtml(todos) {
    return todos.map((todo) => `<li class="todo" data-done="${todo.done}">
                                    <div class="check"></div>
                                    <div class="todo-content">
                                        <div class="meta">
                                            <small class="todo-createddate todo-meta"><span class="material-icons">edit_calendar</span>
                                                <span class="date">${dayjs(todo.createdDate).format('DD.MM.YYYY')}</span>
                                            </small>
                                            <small class="todo-duedate todo-meta"><span class="material-icons">event_available</span>
                                                <input type="date" value="${dayjs(todo.dueDate).format('YYYY-MM-DD')}" class="todo-duedate__edit">
                                                <span class="date">${dayjs(todo.dueDate).format('DD.MM.YYYY')}</span>
                                            </small>
                                            <small class="todo-importance todo-meta"><span class="material-icons">priority_high</span>
                                                <select selected="${todo.importance}" class="todo-importance__edit">
                                                  <option value="1">!</option>
                                                  <option value="2">!!</option>
                                                  <option value="3">!!!</option>
                                                </select>
                                                <span class="importance">${todo.importance}</span>
                                            </small>
                                        </div>
                                        <input type="text" value="${todo.title}" class="todo-title__edit">
                                        <h2 class="edit-mode">${todo.title}</h2>
                                        <textarea class="todo-desc__edit">${todo.description}</textarea>
                                        <p class="todo-desc">${todo.description}</p>
                                        <div class="todo-buttons" data-id="${todo.id}">
                                            <button class="todo-button todo-edit"><span class="material-icons">edit</span></button>
                                            <button class="todo-button todo-done"><span class="material-icons">done</span></button>
                                            <button class="todo-button todo-save"><span class="material-icons">save</span></button>
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
