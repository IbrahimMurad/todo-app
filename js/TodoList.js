import TodoElement from './TodoItem.js';
import { updateItemsLeft } from './serveces.js';

const todoList = document.getElementById('todo-list');

export default async function renderList(list, filter = "all") {

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
