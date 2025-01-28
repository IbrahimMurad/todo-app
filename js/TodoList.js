import TodoElement from './TodoItem.js';
import { updateItemsLeft } from './serveces.js';

const todoList = document.getElementById('todo-list');

/**
 * Renders the todo list
 * @param {Array} list - The list of todo items to render
 * @param {string} filter - The filter to apply to the list
 */
export default function renderList(list, filter = "all") {

  // sort the list by the sort order
  list.sort((a, b) => a.sort - b.sort);

  // apply filter
  if (filter === 'active') {
    list = list.filter(todo => !todo.completed);
  }
  if (filter === 'completed') {
    list = list.filter(todo => todo.completed);
  }

  // clear the list then render each item in the list
  todoList.querySelectorAll('.todo-list-item').forEach(item => item.remove());
  list.forEach(todo => {
    const todoElement = TodoElement(todo);
    todoList.prepend(todoElement);
  });
  updateItemsLeft();
}
