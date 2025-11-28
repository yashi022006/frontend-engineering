let toDos = JSON.parse(localStorage.getItem('toDos') || '[]');
let currentFilter = 'all';

function save() {
  localStorage.setItem('toDos', JSON.stringify(toDos));
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;
  if (task.completed) li.classList.add('completed');

  li.innerHTML = `
    <input type="checkbox" class="toggle-done" ${task.completed ? 'checked' : ''}>
    <span>${task.text}</span>
    <button class="edit">Edit</button>
    <button class="delete">X</button>
  `;
  return li;
}

function render() {
  const list = document.getElementById('tasks');
  list.innerHTML = '';

  const filtered = toDos.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'done') return task.completed;
  });

  filtered.forEach(task => {
    list.appendChild(createTaskElement(task));
  });
}

function addTask(text) {
  toDos.push({
    id: Date.now(),
    text: text.trim(),
    completed: false
  });
  save();
  render();
}

document.getElementById('add-task-btn').addEventListener('click', () => {
  const input = document.getElementById('new-task');
  if (!input.value.trim()) {
    alert('Please enter a task');
    return;
  }
  addTask(input.value);
  input.value = '';
});

document.getElementById('tasks').addEventListener('click', e => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.classList.contains('delete')) {
    toDos = toDos.filter(t => t.id !== id);
    save();
    render();
  }

  if (e.target.classList.contains('toggle-done')) {
    const task = toDos.find(t => t.id === id);
    task.completed = e.target.checked;
    save();
    render();
  }

  if (e.target.classList.contains('edit')) {
    const task = toDos.find(t => t.id === id);
    const span = li.querySelector('span');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';

    li.replaceChild(input, span);
    input.focus();

    input.addEventListener('blur', () => {
      task.text = input.value.trim() || task.text;
      save();
      render();
    });

    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') input.blur();
    });
  }
});

document.querySelector('.filters').addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;

  currentFilter = e.target.dataset.filter;

  document.querySelectorAll('.filters button').forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');

  render();
});

render();