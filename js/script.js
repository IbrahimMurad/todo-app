import { getData, setData, addTodoItem, getFilter } from "./serveces.js";
import renderList from "./TodoList.js";

const body = document.body;
const themeToggler = document.querySelector('.theme-toggler')
const todoInput = document.getElementById('todo-input');
const submitButton = document.getElementById('submit-new');

const filters = document.querySelectorAll('.filter-item');

const clearCompleted = document.getElementById('clear-completed');


// Initial render
renderList(getData())


// Event listeners for non todo items elements 

submitButton.addEventListener('click', () => {
    if (submitButton.classList.contains('active')) {
        // Add the new todo item to the list and rerender the list with the new data and the current filter
        const newData = addTodoItem(todoInput.value);
        renderList(newData, getFilter())
    }
});

todoInput.addEventListener('input', () => {
    if (todoInput.value.length > 0) {
        // Enable the submit button if there is text in the input
        submitButton.classList.add('active')
    } else {
        submitButton.classList.remove('active')
    }
});

themeToggler.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        // Change to light mode
        body.classList.remove('dark-mode')
        themeToggler.dataset.mode = 'light'

        // Change background image
        document.querySelector('.background-image[data-mode="dark"]').classList.add('hidden')
        document.querySelector('.background-image[data-mode="light"]').classList.remove('hidden')
    } else {
        // Change theme to dark
        body.classList.add('dark-mode')
        themeToggler.dataset.mode = 'dark'

        // Change background image
        document.querySelector('.background-image[data-mode="dark"]').classList.remove('hidden')
        document.querySelector('.background-image[data-mode="light"]').classList.add('hidden')
    }
})

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        if (!filter.classList.contains('active')) {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Get filter type from element id
            const filterType = filter.id.slice(7);
            console.log(filterType)
            
            // Render list with appropriate filter
            renderList(getData(), filterType === 'all' ? undefined : filterType);
        }
    });
});

clearCompleted.addEventListener('click', () => {
    const data = getData();
    const newData = data.filter(todo => !todo.completed);

    // Update the list with the new data and the current filter
    const filter = filterAll.classList.contains('active') ? 'all' : filterActive.classList.contains('active') ? 'active' : 'completed';
    renderList(newData, filter)
    setData(newData);
});