// Get the current time and display it in the header
function displayCurrentTime() {
    const currentTime = new Date();
    const timeElement = document.getElementById('current-time');
    timeElement.textContent = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Update the current time every second
  setInterval(displayCurrentTime, 1000);
  
  // Toggle dark mode
  const themeCheckbox = document.getElementById('theme-checkbox');
  themeCheckbox.addEventListener('change', function () {
    document.body.classList.toggle('theme-dark');
  });
  
  // Task data
  const tasks = [];
  
  // Create a task item
  function createTaskItem(task, status) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskItem.innerHTML = `
      <h3>${task.name}</h3>
      <p>Date: ${task.date}</p>
      <p>Description: ${task.description}</p>
      <p>Category: ${task.category}</p>
      ${status === 'pending' ? '<button class="completed-btn">Mark Completed</button>' : ''}
    `;
    return taskItem;
  }
  
  // Filter tasks based on status
  function filterTasksByStatus(status) {
    return tasks.filter(task => task.status === status);
  }
  
  // Display tasks in the task list
  function displayTasks(taskListId, status) {
    const taskList = document.getElementById(taskListId);
    const filteredTasks = filterTasksByStatus(status);
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
      const taskItem = createTaskItem(task, status);
      taskList.appendChild(taskItem);
    });
  
    // Update column height based on task count
    const column = document.getElementById(taskListId);
    column.style.height = `${Math.ceil(filteredTasks.length / 3) * 220}px`;
  }
  
  // Move task from pending to completed
  function moveTaskToCompleted(taskName) {
    const pendingTaskIndex = tasks.findIndex(task => task.name === taskName);
    if (pendingTaskIndex !== -1) {
      const completedTask = tasks.splice(pendingTaskIndex, 1)[0];
      completedTask.completed = true;
      completedTask.status = 'completed';
      tasks.push(completedTask);
  
      displayTasks('pendingTasks', 'pending');
      displayTasks('completedTasks', 'completed');
    }
  }
  
  // Handle task item completion
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('completed-btn')) {
      const taskItem = event.target.closest('.task-item');
      const taskName = taskItem.querySelector('h3').textContent;
      moveTaskToCompleted(taskName);
    }
  });
  
  // Handle form submission
  const taskForm = document.getElementById('taskForm');
  taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskStatus = 'pending';
  
    const newTask = {
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      category: taskCategory,
      status: taskStatus,
      completed: false,
      date: new Date().toLocaleDateString()
    };
  
    tasks.push(newTask);
    displayTasks('pendingTasks', 'pending');
  
    taskForm.reset();
  });
  
  // Display tasks on page load
  window.addEventListener('load', function () {
    displayTasks('pendingTasks', 'pending');
    displayTasks('completedTasks', 'completed');
  });