import { getData, setData, addTodoItem } from "./serveces.js";
import renderList from "./TodoList.js";

const body = document.body;
const themeToggler = document.querySelector('.theme-toggler')
const backgroundImages = document.querySelectorAll('.background-image')
const todoInput = document.getElementById('todo-input');
const submitButton = document.getElementById('submit-new');

const filterAll = document.getElementById('filter-all');
const filterActive = document.getElementById('filter-active');
const filterCompleted = document.getElementById('filter-completed');

const clearCompleted = document.getElementById('clear-completed');


// Initial render
renderList(getData())


// Event listeners for non todo items elements 

submitButton.addEventListener('click', () => {
    if (submitButton.classList.contains('active')) {
        const newData = addTodoItem(todoInput.value);
        const filter = filterAll.classList.contains('active') ? 'all' : filterActive.classList.contains('active') ? 'active' : 'completed';
        renderList(newData, filter)
    }
});

todoInput.addEventListener('input', () => {
    if (todoInput.value.length > 0) {
        submitButton.classList.add('active')
    } else {
        submitButton.classList.remove('active')
    }
});

themeToggler.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode')
        themeToggler.dataset.mode = 'light'
        backgroundImages.forEach((image) => {
            if (image.dataset.mode === 'light') {
                image.classList.remove('hidden')
            } else {
                image.classList.add('hidden')
            }
        })
    } else {
        body.classList.add('dark-mode')
        themeToggler.dataset.mode = 'dark'
        backgroundImages.forEach((image) => {
            if (image.dataset.mode === 'dark') {
                image.classList.remove('hidden')
            } else {
                image.classList.add('hidden')
            }
        })
    }
})

filterAll.addEventListener('click', () => {
    if (!filterAll.classList.contains('active')) {
        filterAll.classList.add('active')
        filterActive.classList.remove('active')
        filterCompleted.classList.remove('active')
        renderList(getData())
    }
});

filterActive.addEventListener('click', () => {
    if (!filterActive.classList.contains('active')) {
        filterAll.classList.remove('active')
        filterActive.classList.add('active')
        filterCompleted.classList.remove('active')
        renderList(getData(), 'active')
    }
});

filterCompleted.addEventListener('click', () => {
    if (!filterCompleted.classList.contains('active')) {
        filterAll.classList.remove('active')
        filterActive.classList.remove('active')
        filterCompleted.classList.add('active')
        renderList(getData(), 'completed')
    }
});

clearCompleted.addEventListener('click', () => {
    const data = getData();
    const newData = data.filter(todo => !todo.completed);
    const filter = filterAll.classList.contains('active') ? 'all' : filterActive.classList.contains('active') ? 'active' : 'completed';
    renderList(newData, filter)
    setData(newData);
});