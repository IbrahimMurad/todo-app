import renderList from './TodoList.js';

export function getData() {
    try {
        return JSON.parse(localStorage.getItem('todoAppData')) || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function setData(data) {
    localStorage.setItem('todoAppData', JSON.stringify(data))
}

export function getFilter() {
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');
    if (filterAll.classList.contains('active')) {
        return 'all';
    }
    if (filterActive.classList.contains('active')) {
        return 'active';
    }
    if (filterCompleted.classList.contains('active')) {
        return 'completed';
    }
}

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
