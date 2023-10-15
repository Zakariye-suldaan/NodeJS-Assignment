const fs = require('fs');

const tasksFile = 'tasks.json';
let tasks = [];

function loadTasks() {
  try {
    const data = fs.readFileSync(tasksFile, 'utf8');
    tasks = JSON.parse(data);
  } catch (err) {
    tasks = [];
  }
}

function saveTasks() {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(tasksFile, data, 'utf8');
}

function addTask(task) {
  const taskObj = {
    id: tasks.length + 1,
    task: task
  };
  tasks.push(taskObj);
  saveTasks();
  console.log('Task added successfully!');
}

function updateTask(id, updatedTask) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.task = updatedTask;
    saveTasks();
    console.log('Task updated successfully!');
  } else {
    console.log('Invalid task ID!');
  }
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasks();
    console.log('Task deleted successfully!');
  } else {
    console.log('Invalid task ID!');
  }
}

function listAllTasks() {
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log('Tasks:');
    tasks.forEach(task => {
      console.log(`${task.id}. ${task.task}`);
    });
  }
}

function displayMenu() {
  console.log('1. Add Task');
  console.log('2. Update Task');
  console.log('3. Delete Task');
  console.log('4. List All Tasks');
  console.log('5. Exit');
  console.log('Enter your choice:');
}

loadTasks();

module.exports = {
  displayMenu,
  addTask,
  updateTask,
  deleteTask,
  listAllTasks
};