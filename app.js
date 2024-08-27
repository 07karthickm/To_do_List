let button = document.getElementById('add');
let todoList = document.getElementById('todoList');
let input = document.getElementById('input');

// Initialize todos array
let todos = [];

// Load todos from local storage on window load
window.onload = () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addtodo(todo));
}

// Add event listener to the Add button
button.addEventListener('click', () => {
    if (input.value.trim()) { // Check if input is not empty
        todos.push(input.value.trim());
        localStorage.setItem('todos', JSON.stringify(todos));
        addtodo(input.value.trim());
        input.value = ''; // Clear the input field
    }
});

// Function to add a to-do item to the list
function addtodo(todo) {
    let todoContainer = document.createElement('div');
    todoContainer.className = 'todo-item';
    
    let para = document.createElement('p');
    para.innerText = todo;
    
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-btn';

    // Append paragraph and delete button to the container
    todoContainer.appendChild(para);
    todoContainer.appendChild(deleteButton);
    todoList.appendChild(todoContainer);

    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(todoContainer);
        remove(todo);
    });

    // Add event listener to the paragraph for marking as completed
    para.addEventListener('click', () => {
        para.style.textDecoration = para.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        if (para.style.textDecoration === 'line-through') {
            remove(todo);
        }
    });
}

// Function to remove a to-do item from the list and local storage
function remove(todo) {
    let index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
    }
    localStorage.setItem('todos', JSON.stringify(todos));
}
