import { removeTodoItem, toggleComplete, reorderTodoItems, updateItemsLeft } from './serveces.js';

/**
 * Creates a checkable circle element for the todo item
 * @returns {HTMLSpanElement} The check circle element
 */
function CheckCircle() {
    const checkCircle = document.createElement('span');
    checkCircle.classList.add('check-circle');
    // Toggle completion when clicked
    checkCircle.addEventListener('click', () => {
        toggleComplete(checkCircle.parentElement);
        updateItemsLeft();
    });
    return checkCircle;
}

/**
 * Creates a text element for the todo item
 * @param {string} value - The text content of the todo item
 * @returns {HTMLParagraphElement} The text element
 */
function TodoText(value) {
    const text = document.createElement('p');
    text.textContent = value;
    // Toggle completion when clicked
    text.addEventListener('click', () => {
        toggleComplete(text.parentElement);
    });
    return text;
}

/**
 * Creates a remove button element for the todo item
 * @returns {HTMLSpanElement} The remove button element
 */
function Cross() {
    const cross = document.createElement('span');
    cross.classList.add('cross');
    // Remove item when clicked
    cross.addEventListener('click', () => {
        removeTodoItem(cross.parentElement);
    });
    return cross;
}

/**
 * Creates a new todo item element
 * @param {Object} todo - The todo item data
 * @param {string} todo.text - The text content of the todo item
 * @param {number} todo.sort - The sort order of the todo item
 * @returns {HTMLLIElement} The created todo item element
 */
export default function TodoElement(todo) {

    const item = document.createElement('li');
    item.classList.add('todo-list-item');
    item.dataset.completed = todo.completed;
    item.dataset.sort = todo.sort;
    // Add unique identifier for persistence
    item.dataset.id = todo.id;

    item.setAttribute('draggable', true);

    // Add drag events
    item.addEventListener('dragstart', (event) => {
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', (event) => {
        item.classList.remove('dragging');

        // Update sort order of the elements in the data store
        reorderTodoItems();
    });

    item.addEventListener('dragover', (event) => {
        event.preventDefault();

        const draggedItem = document.querySelector('.dragging');
        const target = event.target.closest('.todo-list-item');
        const targetSort = target.dataset.sort;
        const draggedSort = draggedItem.dataset.sort;
    
        if (targetSort < draggedSort) {
            target.before(draggedItem);
        } else {
            target.after(draggedItem);
        }
    
        // Update sort order
        draggedItem.dataset.sort = targetSort;
        target.dataset.sort = draggedSort;
    });

    // add children elements to the item
    item.appendChild(CheckCircle());
    item.appendChild(TodoText(todo.text));
    item.appendChild(Cross());

    return item;
}
