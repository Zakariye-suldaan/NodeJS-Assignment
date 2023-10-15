const readline = require('readline');
const { displayMenu, addTask, updateTask, deleteTask, listAllTasks } = require('./todo');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => {
  console.log('Exiting Todo List application.');
  process.exit(0);
});

function handleUserInput(choice) {
  switch (choice) {
    case '1':
      rl.question('Enter AddTask: ', task => {
        addTask(task);
        displayMenu();
      });
      break;
    case '2':
      rl.question('Enter task ID: ', id => {
        rl.question('Enter updated task: ', updatedTask => {
          updateTask(parseInt(id), updatedTask);
          displayMenu();
        });
      });
      break;
    case '3':
      rl.question('Enter task ID: ', id => {
        deleteTask(parseInt(id));
        displayMenu();
      });
      break;
    case '4':
      listAllTasks();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Invalid choice!');
      displayMenu();
      break;
  }
}

console.log('==== Todo List ====');
displayMenu();
rl.on('line', handleUserInput);