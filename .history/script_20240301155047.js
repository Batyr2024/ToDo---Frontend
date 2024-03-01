let arrayTask = [];
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskDeleted = document.getElementById('taskDeleted');
const checkboxSelectAll = document.getElementById('checkboxSelectAll');
const idGlobalArray = { id: 1 };
const actual = { actual: 'all' };
const spanAll = document.getElementById('spanAll');
const spanActive = document.getElementById('spanActive');
const spanCompleted = document.getElementById('spanCompleted');
const pAll = document.getElementById('pAll');
const pActive = document.getElementById('pActive');
const pCompleted = document.getElementById('pCompleted');
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function tabulation(taskText) {
  return (taskText.length > 60) ?
    taskText.slice(0, 60 - 1) + '…' : taskText;
}
function counter() {
  spanAll.textContent = '0';
  spanActive.textContent = '0';
  spanCompleted.textContent = '0';
  const arrayActive = arrayTask.filter((value) => value.isChecked === false);
  const arrayCompleted = arrayTask.filter((value) => value.isChecked === true);
  spanActive.textContent = String(arrayActive.length);
  spanCompleted.textContent = String(arrayCompleted.length);
  spanAll.textContent = String((arrayActive.length) + (arrayCompleted.length));
}
function render() {
  actual.actual = 'all';
  taskList.innerHTML = ' ';
  spanAll.textContent = '0';
  spanActive.textContent = '0';

  let listHtml = '';

  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    listHtml += `
  <li>
  <input class="checkbox" ${element.isChecked ? 'checked' : ''} id=${idCheckbox} type ="checkbox">
  <span id=${idCheckbox} >${tabulation(taskText)}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    counter();
  });
  taskList.innerHTML += listHtml;
}
function showActive() {
  actual.actual = 'active';
  let listHtml = '';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    if (element.isChecked === false) {
      listHtml += `
  <li>
  <input class="checkbox" id=${idCheckbox} type ="checkbox">
  <span id=${idCheckbox} >${taskText}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    }
  });
  taskList.innerHTML = '';
  taskList.innerHTML += listHtml;
}

function showCompleted() {
  actual.actual = 'complete';
  let listHtml = '';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    if (element.isChecked === true) {
      listHtml += `
  <li>
  <input class="checkbox" checked  id=${idCheckbox} type ="checkbox">
  <span id=${idCheckbox} >${taskText}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    }
  });
  taskList.innerHTML = '';
  taskList.innerHTML += listHtml;
}
function handleAddTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  arrayTask.push({
    id: Date.now(),
    text: escapeRegex(taskText),
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
  const elementId = Number(event.target.id);
  const index = arrayTask.findIndex((el) => el.id === elementId);
  let checkedAllTrue = false;
  if (arrayTask[index].isChecked === false) {
    arrayTask[index].isChecked = true;
    if (actual.actual === 'active') { showActive(); }
  } else {
    arrayTask[index].isChecked = false;
    if (actual.actual === 'complete') { showCompleted(); }
  }
  for (let i = 0; i < arrayTask.length; i++) {
    if (arrayTask[i].isChecked === false) { checkedAllTrue = false; break; } else { checkedAllTrue = true; }
  }
  if (checkedAllTrue === true) { checkboxSelectAll.checked = true; } else { checkboxSelectAll.checked = false; }
  counter();
}
function deleteThisTask(event) {
  const elementId = event.target.className;
  if (elementId === 'delete') {
    const index = arrayTask.findIndex((item) => item.id === elementId);
    arrayTask.splice(index, 1);
    render();
  }
}
function deleteSelectTasks() {
  arrayTask = arrayTask.filter((value) => value.isChecked === false);
  render();
  checkboxSelectAll.checked = false;
}
function changeTasks(event) {
  const elementId = Number(event.target.id);
  let listHtml = '';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = escapeRegex(element.text);
    if (idCheckbox === elementId) {
      idGlobalArray.id = elementId;
      listHtml += `
    <li>
    <input class="checkbox"  id=${idCheckbox} type ="checkbox">
    <input id="task-Text" type="text" value=${taskText} onBlur="alert">
    <span id=${idCheckbox} class="delete">X</span>
    </li>
        `;
    } else {
      listHtml += `
    <li>
    <input class="checkbox"  id=${idCheckbox} type ="checkbox">
    <span id=${idCheckbox} >${taskText}</span>
    <span id=${idCheckbox} class="delete">X</span>
    </li>
        `;
    }
  });
  taskList.innerHTML = '';
  taskList.innerHTML = listHtml;
}
function addChangeTasks() {
  const taskListInput = document.getElementById('task-Text');
  if (taskListInput === null) return;
  const taskText = taskListInput.value.trim();
  const index = arrayTask.findIndex((item) => item.id === idGlobalArray.id);
  arrayTask[index].text = escapeRegex(taskText);
  render();
}
function addTaskPressKey(event) {
  if (event.key === 'Enter') {
    addTaskButton.click();
    addChangeTasks();
  }
  if (event.key === 'Escape') {
    render();
  }
}

addTaskButton.addEventListener('click', handleAddTask);
checkboxSelectAll.addEventListener('click', selectAllCheckboxTasks);
taskList.addEventListener('change', checkboxClicksTasks);
taskList.addEventListener('click', deleteThisTask);
taskDeleted.addEventListener('click', deleteSelectTasks);
taskInput.addEventListener('keyup', addTaskPressKey);
taskList.addEventListener('dblclick', changeTasks);
taskList.addEventListener('keyup', addTaskPressKey);
taskList.addEventListener('blur', addChangeTasks, true);
pAll.addEventListener('click', render);
pActive.addEventListener('click', showActive);
pCompleted.addEventListener('click', showCompleted);
