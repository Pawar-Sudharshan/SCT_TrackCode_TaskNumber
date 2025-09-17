// Enhanced To-Do App JavaScript

class TodoApp {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderTasks();
    this.updateStats();
    this.setupCharCounter();
  }

  bindEvents() {
    // Add task event
    document.getElementById('addBtn').addEventListener('click', () => this.addTask());
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });

    // Filter events
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
    });

    // Bulk actions
    document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
    document.getElementById('markAllComplete').addEventListener('click', () => this.markAllComplete());

    // Auto-save on page unload
    window.addEventListener('beforeunload', () => this.saveTasks());
  }

  setupCharCounter() {
    const taskInput = document.getElementById('taskInput');
    const charCount = document.getElementById('charCount');

    taskInput.addEventListener('input', () => {
      const length = taskInput.value.length;
      charCount.textContent = length;
      charCount.style.color = length > 90 ? '#f44336' : length > 70 ? '#ff9800' : '#666';
    });
  }

  addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTime = document.getElementById('taskTime');
    const priority = document.getElementById('priority');

    const taskText = taskInput.value.trim();
    const taskDateTime = taskTime.value;
    const taskPriority = priority.value;

    if (taskText === '') {
      this.showAlert('Please enter a task description!');
      taskInput.focus();
      return;
    }

    if (taskText.length > 100) {
      this.showAlert('Task description is too long (max 100 characters)!');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      datetime: taskDateTime,
      priority: taskPriority,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();

    // Clear inputs
    taskInput.value = '';
    taskTime.value = '';
    priority.value = 'medium';
    document.getElementById('charCount').textContent = '0';

    // Show success feedback
    this.showToast('Task added successfully!', 'success');
  }

  editTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt('Edit task:', task.text);
    if (newText === null) return; // User cancelled

    if (newText.trim() === '') {
      this.showAlert('Task cannot be empty!');
      return;
    }

    if (newText.length > 100) {
      this.showAlert('Task description is too long (max 100 characters)!');
      return;
    }

    task.text = newText.trim();
    this.saveTasks();
    this.renderTasks();
    this.showToast('Task updated!', 'info');
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      task.completedAt = task.completed ? new Date().toISOString() : null;
      this.saveTasks();
      this.renderTasks();
      this.updateStats();

      const message = task.completed ? 'Task completed!' : 'Task marked as pending';
      this.showToast(message, task.completed ? 'success' : 'info');
    }
  }

  deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
      this.showToast('Task deleted!', 'warning');
    }
  }

  setFilter(filter) {
    this.currentFilter = filter;

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

    this.renderTasks();
  }

  clearCompleted() {
    const completedCount = this.tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      this.showAlert('No completed tasks to clear!');
      return;
    }

    if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
      this.tasks = this.tasks.filter(t => !t.completed);
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
      this.showToast(`Cleared ${completedCount} completed tasks!`, 'success');
    }
  }

  markAllComplete() {
    const pendingTasks = this.tasks.filter(t => !t.completed);
    if (pendingTasks.length === 0) {
      this.showAlert('All tasks are already completed!');
      return;
    }

    this.tasks.forEach(task => {
      if (!task.completed) {
        task.completed = true;
        task.completedAt = new Date().toISOString();
      }
    });

    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.showToast(`Marked ${pendingTasks.length} tasks as completed!`, 'success');
  }

  renderTasks() {
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');

    let filteredTasks = this.tasks;

    // Apply filter
    switch (this.currentFilter) {
      case 'pending':
        filteredTasks = this.tasks.filter(t => !t.completed);
        break;
      case 'completed':
        filteredTasks = this.tasks.filter(t => t.completed);
        break;
      default:
        filteredTasks = this.tasks;
    }

    // Sort tasks: pending first, then by priority, then by due date
    filteredTasks.sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      if (a.datetime && b.datetime) {
        return new Date(a.datetime) - new Date(b.datetime);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Show/hide empty state
    if (filteredTasks.length === 0) {
      taskList.style.display = 'none';
      emptyState.classList.remove('hidden');
      emptyState.innerHTML = this.getEmptyStateMessage();
    } else {
      taskList.style.display = 'block';
      emptyState.classList.add('hidden');
    }

    // Render tasks
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
      const li = this.createTaskElement(task);
      taskList.appendChild(li);
    });
  }

  createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task ${task.priority}-priority ${task.completed ? 'completed' : ''}`;

    const isOverdue = task.datetime && new Date(task.datetime) < new Date() && !task.completed;

    li.innerHTML = `
      <div class="task-content">
        <span class="task-text">${this.escapeHtml(task.text)}</span>
        <span class="priority-badge ${task.priority}">${task.priority}</span>
        ${task.datetime ? `
          <div class="task-time ${isOverdue ? 'overdue' : ''}">
            <i class="fas fa-clock"></i> ${this.formatDateTime(task.datetime)}
            ${isOverdue ? '<i class="fas fa-exclamation-triangle"></i> Overdue' : ''}
          </div>
        ` : ''}
      </div>
      <div class="buttons">
        <button class="task-btn complete" onclick="todoApp.toggleComplete(${task.id})" title="Mark as ${task.completed ? 'pending' : 'completed'}">
          <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
        </button>
        <button class="task-btn edit" onclick="todoApp.editTask(${task.id})" title="Edit task">
          <i class="fas fa-edit"></i>
        </button>
        <button class="task-btn delete" onclick="todoApp.deleteTask(${task.id})" title="Delete task">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    return li;
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = `Total: ${total}`;
    document.getElementById('completedTasks').textContent = `Completed: ${completed}`;
    document.getElementById('pendingTasks').textContent = `Pending: ${pending}`;
  }

  getEmptyStateMessage() {
    switch (this.currentFilter) {
      case 'completed':
        return `
          <i class="fas fa-check-circle"></i>
          <p>No completed tasks yet.<br>Complete some tasks to see them here!</p>
        `;
      case 'pending':
        return `
          <i class="fas fa-thumbs-up"></i>
          <p>All caught up!<br>No pending tasks.</p>
        `;
      default:
        return `
          <i class="fas fa-clipboard-list"></i>
          <p>No tasks yet.<br>Add one above to get started!</p>
        `;
    }
  }

  formatDateTime(datetime) {
    const date = new Date(datetime);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const timeStr = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    if (diffDays === 0) return `Today, ${timeStr}`;
    if (diffDays === 1) return `Tomorrow, ${timeStr}`;
    if (diffDays === -1) return `Yesterday, ${timeStr}`;
    if (diffDays > 1) return `In ${diffDays} days, ${timeStr}`;
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago, ${timeStr}`;

    return timeStr;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
  }

  showAlert(message) {
    alert(message);
  }

  showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas fa-${this.getToastIcon(type)}"></i>
      <span>${message}</span>
    `;

    // Style the toast
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '200px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196F3'
    };
    toast.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  getToastIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || icons.info;
  }
}

// Initialize the app
const todoApp = new TodoApp();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to add task
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    todoApp.addTask();
  }

  // Escape to clear input
  if (e.key === 'Escape') {
    document.getElementById('taskInput').value = '';
    document.getElementById('taskTime').value = '';
    document.getElementById('priority').value = 'medium';
    document.getElementById('charCount').textContent = '0';
  }
});

// Add service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('SW registered'))
      .catch(() => console.log('SW registration failed'));
  });
}