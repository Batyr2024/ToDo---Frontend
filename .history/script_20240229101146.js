let arrayTask = [];
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskDeleted = document.getElementById('taskDeleted');
const checkboxSelectAll = document.getElementById('checkboxSelectAll');

function handleAddTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  arrayTask.push({
    id: Date.now(),
    text: taskText,
    isChecked: false,
  });

  const idArray = arrayTask[arrayTask.length - 1].id;
  const listItem = document.createElement('li');
  listItem.innerHTML = `
      <input class="checkbox"  name="taskCheckbox" id=${idArray} type ="checkbox">
      <span>${taskText}</span>
      <span class="delete">X</span>
  `;
  listItem.querySelector('.delete').addEventListener('click', () => {
    taskList.removeChild(listItem);
  });
  taskList.appendChild(listItem);
  taskInput.value = '';
}

function selectAllCheckboxTasks() {
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const arrayElement = element;
    if (element.isChecked === false) {
      arrayElement.isChecked = true;
      document.getElementById(idCheckbox).checked = true;
    } else {
      arrayElement.isChecked = false;
      document.getElementById(idCheckbox).checked = false;
    }
  });
}

function checkboxClicksTasks(event) {
  const { target } = event;
  const element = target.id;
  const index = arrayTask.findIndex((el) => el.id === Number(element));
  if (arrayTask[index].isChecked === false) {
    arrayTask[index].isChecked = true;
  } else {
    arrayTask[index].isChecked = false;
  }
}
function render() {
  taskList.innerHTML = '';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    const listItem = document.createElement('li');
    listItem.innerHTML += `
    <input class="checkbox"  name="taskCheckbox" id=${idCheckbox} type ="checkbox">
    <span>${taskText}</span>
    <span class="delete">X</span>
        `;
  });
}
function deleteSelectTasks(render) {
  arrayTask = arrayTask.filter((value) => value.isChecked === false);
  render();
}

function addTaskPressKey(event) {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
}

addTaskButton.addEventListener('click', handleAddTask);
checkboxSelectAll.addEventListener('click', selectAllCheckboxTasks);
taskList.addEventListener('change', checkboxClicksTasks);
taskDeleted.addEventListener('click', deleteSelectTasks);
taskInput.addEventListener('keyup', addTaskPressKey);
