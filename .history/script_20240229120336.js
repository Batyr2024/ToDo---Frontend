let arrayTask = [];
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskDeleted = document.getElementById('taskDeleted');
const checkboxSelectAll = document.getElementById('checkboxSelectAll');

function render() {
  taskList.innerHTML = '';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    taskList.innerHTML += `
    <li>
    <input class="checkbox"  id=${idCheckbox} type ="checkbox">
    <span>${taskText}</span>
    <span id=${idCheckbox} class="delete">X</span>
    </li>
        `;
  });
}

function handleAddTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  arrayTask.push({
    id: Date.now(),
    text: taskText,
    isChecked: false,
  });
  render();
  taskInput.value = '';
}

function selectAllCheckboxTasks() {
  if (checkboxSelectAll.checked === true) {
    arrayTask.forEach((element) => {
      const idCheckbox = element.id;
      const arrayElement = element;
      arrayElement.isChecked = true;
      document.getElementById(idCheckbox).checked = true;
    });
  } else {
    arrayTask.forEach((element) => {
      const idCheckbox = element.id;
      const arrayElement = element;
      arrayElement.isChecked = false;
      document.getElementById(idCheckbox).checked = false;
    });
  }
}

function checkboxClicksTasks(event) {
  const { target } = event;
  const element = target.id;
  const index = arrayTask.findIndex((el) => el.id === Number(element));
  let checkedAllTrue = false;
  for (let i = 0; i < arrayTask.length; i++) {
    if (arrayTask[i].isChecked === false) { break; } else { checkedAllTrue = true; }
  }
  if (arrayTask[index].isChecked === false) {
    if (checkedAllTrue === true) { checkboxSelectAll.checked = true; }
    arrayTask[index].isChecked = true;
  } else {
    arrayTask[index].isChecked = false;
    checkboxSelectAll.checked = false;
  }
}

function deleteSelectTasks() {
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
taskList.addEventListener('click', checkboxClicksTasks);
taskDeleted.addEventListener('click', deleteSelectTasks);
taskInput.addEventListener('keyup', addTaskPressKey);
