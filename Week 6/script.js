// Closure example: counter function keeps internal state
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();

// IIFE example: keeps data hidden and returns public methods
const IIFEExample = (function() {
  let secret = 'I am private';
  return {
    revealSecret: function() {
      return secret;
    }
  };
})();

// DOM elements
const output = document.getElementById('output');
const closureBtn = document.getElementById('closureBtn');
const iifeBtn = document.getElementById('iifeBtn');

closureBtn.onclick = () => {
  output.textContent = 'Closure Counter Output:\n';
  for (let i = 0; i < 5; i++) {
    output.textContent += `Call ${i + 1}: ${counter()}\n`;
  }
};

iifeBtn.onclick = () => {
  output.textContent = 'IIFE Example Output:\n';
  output.textContent += IIFEExample.revealSecret();
};

// To-Do List functionality
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;
  span.className = 'task-text';
  li.appendChild(span);

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => taskList.removeChild(li);
  li.appendChild(delBtn);

  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
});

// Allow Enter key to add task
taskInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addTaskBtn.click();
});
