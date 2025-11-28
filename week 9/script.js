
class TodoApp {
  constructor() {
    this.tasks = [];
    this.init();
  }

  init() {
    this.taskInput = document.getElementById('taskInput');
    this.addBtn = document.getElementById('addTaskBtn');
    this.todoList = document.getElementById('todoList');
    
    this.addBtn.addEventListener('click', () => this.addTask());
    this.taskInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') this.addTask();
    });
  }

  addTask() {
    const text = this.taskInput.value.trim();
    if (!text) return;

    const task = {
      id: Date.now(),
      text,
      completed: false
    };

    this.tasks.unshift(task);
    this.render();
    this.taskInput.value = '';
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.render();
    }
  }

  moveUp(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index > 0) {
      [this.tasks[index-1], this.tasks[index]] = [this.tasks[index], this.tasks[index-1]];
      this.render();
    }
  }

  moveDown(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index < this.tasks.length - 1) {
      [this.tasks[index], this.tasks[index+1]] = [this.tasks[index+1], this.tasks[index]];
      this.render();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.render();
  }

  render() {
    this.todoList.innerHTML = '';
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `todo-item ${task.completed ? 'completed' : ''}`;
      
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="todoApp.toggleComplete(${task.id})">
        <span class="todo-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <div class="todo-controls">
          <button class="move-up" onclick="todoApp.moveUp(${task.id})" ${task.id === this.tasks[0]?.id ? 'disabled' : ''}>↑</button>
          <button class="move-down" onclick="todoApp.moveDown(${task.id})" ${task.id === this.tasks[this.tasks.length-1]?.id ? 'disabled' : ''}>↓</button>
          <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})">×</button>
        </div>
      `;
      this.todoList.appendChild(li);
    });
  }
}

// Task 23: Dynamic Chessboard
function createChessboard() {
  const board = document.getElementById('chessboard');
  const pieces = ['♜','♞','♝','♛','♚','♝','♞','♜','♖','♘','♗','♕','♔','♗','♘','♖','♙','♟','♟','♙','♙','♟','♟','♙','♙','♟','♟','♙','♙','♟','♟','♙','♖','♘','♗','♕','♔','♗','♘','♖','♜','♞','♝','♛','♚','♝','♞','♜','♙','♟','♟','♙','♙','♟','♟','♙','♙','♟','♟','♙','♙','♟','♟','♙'];

  for (let i = 0; i < 64; i++) {
    const square = document.createElement('div');
    square.className = `chess-square ${(i + Math.floor(i/8)) % 2 === 0 ? 'light' : 'dark'}`;
    square.dataset.row = Math.floor(i / 8);
    square.dataset.col = i % 8;
    square.textContent = pieces[i];
    
    square.addEventListener('click', () => {
      document.querySelectorAll('.chess-square').forEach(s => s.classList.remove('selected'));
      square.classList.add('selected');
    });
    
    board.appendChild(square);
  }
}
const todoApp = new TodoApp();
createChessboard();
