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
spanAll.textContent = '0';
spanActive.textContent = '0';
spanCompleted.textContent = '0';
function render() {
  actual.actual = 'all';
  taskList.innerHTML = ' ';
  spanAll.textContent = '0';
  spanActive.textContent = '0';
  let arrayActive = arrayTask.filter((value) => value.isChecked === false);
  let arrayCompleted = arrayTask.filter((value) => value.isChecked === true);
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    if (element.isChecked === true) {
      taskList.innerHTML += `
  <li>
  <input class="checkbox" checked id=${idCheckbox} type ="checkbox">
  <span id=${idCheckbox} >${taskText}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    }
    if (element.isChecked === false) {
      taskList.innerHTML += `
  <li>
  <input class="checkbox" id=${idCheckbox} type ="checkbox">
  <span id=${idCheckbox} >${taskText}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    }
    spanActive.textContent = arrayActive.length + 1;
    spanCompleted.textContent = 
    spanAll.textContent = String((Number(spanAll.textContent) + 1));
  });
}
function showActive() {
  actual.actual = 'active';
  taskList.innerHTML = ' ';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    if (element.isChecked === false) {
      taskList.innerHTML += `
  <li>
  <input class="checkbox"  id=${idCheckbox} type ="checkbox">
  <span id=${idCheckbox} >${taskText}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    }
  });
}
function showCompleted() {
  actual.actual = 'complete';
  taskList.innerHTML = ' ';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    if (element.isChecked === true) {
      taskList.innerHTML += `
  <li>
  <input class="checkbox" checked  id=${idCheckbox} type ="checkbox">
  <span id=${idCheckbox} >${taskText}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    }
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
      spanCompleted.textContent = String((Number(spanActive.textContent) + 1));
    });
  } else {
    arrayTask.forEach((element) => {
      const idCheckbox = element.id;
      const arrayElement = element;
      arrayElement.isChecked = false;
      document.getElementById(idCheckbox).checked = false;
      spanCompleted.textContent = String((Number(spanActive.textContent) - 1));
    });
  }
}

function checkboxClicksTasks(event) {
  const { target } = event;
  const element = Number(target.id);
  const index = arrayTask.findIndex((el) => el.id === element);
  let checkedAllTrue = false;
  if (arrayTask[index].isChecked === false) {
    arrayTask[index].isChecked = true;
    spanCompleted.textContent = String((Number(spanActive.textContent) + 1));
    if (actual.actual === 'active') { showActive(); }
  } else {
    arrayTask[index].isChecked = false;
    spanCompleted.textContent = String((Number(spanActive.textContent) - 1));
    if (actual.actual === 'complete') { showCompleted(); }
  }
  for (let i = 0; i < arrayTask.length; i++) {
    if (arrayTask[i].isChecked === false) { checkedAllTrue = false; break; } else { checkedAllTrue = true; }
  }
  if (checkedAllTrue === true) { checkboxSelectAll.checked = true; } else { checkboxSelectAll.checked = false; }
}

function deleteSelectTasks() {
  arrayTask = arrayTask.filter((value) => value.isChecked === false);
  render();
  spanCompleted.textContent = String((Number(spanCompleted.textContent) + 1));
  checkboxSelectAll.checked = false;
}
function changeTasks(event) {
  const { target } = event;
  const elementId = Number(target.id);
  taskList.innerHTML = '';
  arrayTask.forEach((element) => {
    const idCheckbox = element.id;
    const taskText = element.text;
    if (idCheckbox === elementId) {
      idGlobalArray.id = elementId;
      taskList.innerHTML += `
    <li>
    <input class="checkbox"  id=${idCheckbox} type ="checkbox">
    <input id="task-Text" type="text" value=${taskText} onBlur="alert">
    <span id=${idCheckbox} class="delete">X</span>
    </li>
        `;
    } else {
      taskList.innerHTML += `
    <li>
    <input class="checkbox"  id=${idCheckbox} type ="checkbox">
    <span id=${idCheckbox} >${taskText}</span>
    <span id=${idCheckbox} class="delete">X</span>
    </li>
        `;
    }
  });
}
function addChangeTasks() {
  const taskListInput = document.getElementById('task-Text');
  if (taskListInput === null) return;
  const taskText = taskListInput.value.trim();
  const index = arrayTask.findIndex((el) => el.id === idGlobalArray.id);
  arrayTask[index].text = taskText;
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
taskDeleted.addEventListener('click', deleteSelectTasks);
taskInput.addEventListener('keyup', addTaskPressKey);
taskList.addEventListener('dblclick', changeTasks);
taskList.addEventListener('keyup', addTaskPressKey);
taskList.addEventListener('blur', addChangeTasks, true);
pAll.addEventListener('click', render);
pActive.addEventListener('click', showActive);
pCompleted.addEventListener('click', showCompleted);
