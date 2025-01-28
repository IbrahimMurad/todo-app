import renderList from './TodoList.js';

/**
 * Gets data from local storage
 * @returns {Array} The data from local storage or an empty array
 */
export function getData() {
    // Get data from local storage and parse it as JSON
    // or return an empty array
    try {
        return JSON.parse(localStorage.getItem('todoAppData')) || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Saves data to local storage
 * @param {Array} data - The data to save
 */
export function setData(data) {
    // Save data to local storage as a JSON string
    localStorage.setItem('todoAppData', JSON.stringify(data))
}

/**
 * Gets the currently active filter
 * @returns {string} The currently active filter
 */
export function getFilter() {
    const filters = document.querySelectorAll('.filter-item');
    for (const filter of filters) {
        if (filter.classList.contains('active')) {
            return filter.id.slice(7);
        }
    }
}

/**
 * Updates the items left counter in the list footer
 * @param {Array} data - The todo list data
 */
export function updateItemsLeft(data = getData()) {
    const itemsLeft = document.getElementById('items-left');
    itemsLeft.textContent = `${data.filter(todo => !todo.completed).length} items left`;
}

/**
 * Toggles the completion state of a todo item
 * @param {HTMLElement} item - The todo item element to toggle
 */
export function toggleComplete(item) {
    const id = item.dataset.id
    item.dataset.completed = item.dataset.completed === 'true' ? 'false' : 'true';
    const data = getData();
    const updatedData = data.map(todo => {
        if (todo.id === id) {
            todo.completed = item.dataset.completed === 'true';
        }
        return todo;
    });
    updateItemsLeft(updatedData);
    setData(updatedData);
    renderList(updatedData, getFilter());
}

/**
 * Removes a todo item from the DOM
 * @param {HTMLElement} item - The todo item element to remove
 */
export function removeTodoItem(item) {
    const id = item.dataset.id
    item.remove();
    const data = getData();
    const updatedData = data.filter(todo => todo.id !== id);
    updateItemsLeft(updatedData);
    setData(updatedData);
}

/**
 * Clears all completed todo items from the list
 */
export function reorderTodoItems() {
    const items = document.querySelectorAll('.todo-list-item');
    const data = getData();
    items.forEach((item, index) => {
        const id = item.dataset.id;
        const todo = data.find(todo => todo.id === id);
        todo.sort = data.length - index;
    });
    setData(data);
}

/**
 * Adds a new todo item to the list
 * @param {string} value - The text content of the new todo item
 * @returns {Array} The updated todo list data
 */
export function addTodoItem(value) {
    const data = getData();
    try {
        const newTodoData = {
            id: crypto.randomUUID(),
            text: value,
            sort: data.length + 1,
            completed: false 
        }
        const todoList = document.getElementById('todo-list');

        // save the new todo item to local storage
        data.push(newTodoData)
        setData(data)
        return data;

    } catch (error) {
        console.error(error);
    }
}
