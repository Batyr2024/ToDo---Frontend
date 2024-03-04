(() => {
  let arrayTask = [];
  const { _ } = window;
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const taskDeleted = document.getElementById('taskDeleted');
  const checkboxSelectAll = document.getElementById('checkboxSelectAll');
  let idGlobalArray = 1;
  const actual = { actual: 'all', selectPage: 1, maxPageActive: 1 };
  const spanAll = document.getElementById('spanAll');
  const spanActive = document.getElementById('spanActive');
  const spanCompleted = document.getElementById('spanCompleted');
  const pAll = document.getElementById('pAll');
  const pActive = document.getElementById('pActive');
  const pCompleted = document.getElementById('pCompleted');
  const paginationDiv = document.getElementById('pagination');
  const keyEnter = 'Enter';
  const keyEscape = 'Escape';
  const maxTaskPage = 5;

  function addPage(lengthArray) {
    let length = 0;
    if (actual.actual === 'all') {
      length = arrayTask.length;
    } else {
      length = lengthArray;
    }
    const page = Math.ceil(length / maxTaskPage);
    let listHtml = '';
    for (let i = 0; page > i; i += 1) {
      listHtml += `
      <a href="#" class=page id=${String(i + 1)}>${String(i + 1)}</a>
      `;
    }
    paginationDiv.innerHTML = '';
    paginationDiv.innerHTML += listHtml;
    document.getElementById(actual.selectPage).style = 'background:#74a5e0;';
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
    let listHtml = '';
    addPage();
    const endIndex = actual.selectPage * maxTaskPage;
    const startIndex = endIndex - maxTaskPage;
    const arrayTaskPage = arrayTask.slice(startIndex, endIndex);
    arrayTaskPage.forEach((element) => {
      const idCheckbox = element.id;
      const taskText = element.text;
      listHtml += `
  <li>
  <input class="checkbox" ${element.isChecked ? 'checked' : ''} id=${idCheckbox} type ="checkbox">
  <span id="taskText-${idCheckbox}" >${_.escape(taskText)}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
      counter();
    });
    taskList.innerHTML += listHtml;
    actual.selectPage = 1;
  }
  function showActive() {
    actual.actual = 'active';
    let listHtml = '';
    let arrayTaskPage = arrayTask.filter((value) => value.isChecked === false);
    const lengthArray = arrayTaskPage.length;
    addPage(lengthArray);
    const endIndex = actual.selectPage * maxTaskPage;
    const startIndex = endIndex - maxTaskPage;
    arrayTaskPage = arrayTaskPage.slice(startIndex, endIndex);
    arrayTaskPage.forEach((element) => {
      const idCheckbox = element.id;
      const taskText = element.text;
      if (element.isChecked === false) {
        listHtml += `
  <li>
  <input class="checkbox" id=${idCheckbox} type ="checkbox">
  <span id="${idCheckbox}" >${_.escape(taskText)}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
      }
    });
    taskList.innerHTML = '';
    taskList.innerHTML += listHtml;
    actual.maxPageActive = Math.ceil(lengthArray / maxTaskPage);
    actual.selectPage = 1;
  }

  function showCompleted() {
    actual.actual = 'complete';
    let listHtml = '';
    let arrayTaskPage = arrayTask.filter((value) => value.isChecked === true);
    const lengthArray = arrayTaskPage.length;
    addPage(lengthArray);
    const endIndex = actual.selectPage * maxTaskPage;
    const startIndex = endIndex - maxTaskPage;
    arrayTaskPage = arrayTaskPage.slice(startIndex, endIndex);
    arrayTaskPage.forEach((element) => {
      const idCheckbox = element.id;
      const taskText = element.text;
      if (element.isChecked === true) {
        listHtml += `
  <li>
  <input class="checkbox" checked  id=${idCheckbox} type ="checkbox">
  <span id='${idCheckbox}' >${_.escape(taskText)}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
      }
    });
    taskList.innerHTML = '';
    taskList.innerHTML += listHtml;
    actual.selectPage = 1;
  }
  function selectPage(event) {
    document.getElementById(actual.selectPage).style = 'background:#74a5e0;';
    if (event.target.className === 'page') {
      actual.selectPage = Number(event.target.id);
      switch (actual.actual) {
        case 'active':
          showActive();
          break;
        case 'complete':
          showCompleted();
          break;
        default:
          render();
          break;
      }
    }
  }
  function handleAddTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    arrayTask.push({
      id: Date.now(),
      text: taskText,
      isChecked: false,
    });
    switch (actual.actual) {
      case 'all':
        actual.selectPage = Math.ceil(arrayTask.length / maxTaskPage);
        render();
        break;
      case 'active':
        actual.selectPage = actual.maxPageActive;
        showActive();
        break;
      default:
        break;
    }
    counter();
    taskInput.value = '';
  }
  function selectAllCheckboxTasks(event) {
    switch (actual.actual) {
      case 'all':
        arrayTask.forEach((element) => {
          const arrayElement = element;
          arrayElement.isChecked = event.target.checked;
        });
        render();
        break;
      case 'active':
        arrayTask.forEach((element) => {
          const arrayElement = element;
          arrayElement.isChecked = event.target.checked;
        });
        showActive();
        break;
      case 'complete':
        arrayTask.forEach((element) => {
          const arrayElement = element;
          arrayElement.isChecked = event.target.checked;
        });
        showCompleted();
        break;
      default:
        break;
    }
    counter();
  }
  function checkboxClicksTasks(event) {
    if (event.target.className === 'checkbox') {
      const elementId = Number(event.target.id);
      const index = arrayTask.findIndex((item) => item.id === elementId);
      let checkedAllTrue = false;
      if (arrayTask[index].isChecked === false) {
        arrayTask[index].isChecked = true;
        if (actual.actual === 'active') { showActive(); }
      } else {
        arrayTask[index].isChecked = false;
        if (actual.actual === 'complete') { showCompleted(); }
      }
      for (let i = 0; i < arrayTask.length; i += 1) {
        if (arrayTask[i].isChecked === false) {
          checkedAllTrue = false; break;
        } else { checkedAllTrue = true; }
      }
      if (checkedAllTrue === true) {
        checkboxSelectAll.checked = true;
      } else { checkboxSelectAll.checked = false; }
      counter();
    }
  }
  function deleteThisTask(event) {
    const elementClass = event.target.className;
    const elementId = event.target.id;
    if (elementClass === 'delete') {
      const index = arrayTask.findIndex((item) => item.id === Number(elementId));
      arrayTask.splice(index, 1);
      switch (actual.actual) {
        case 'active':
          showActive();
          break;
        case 'complete':
          showCompleted();
          break;
        default:
          render();
          break;
      }
    }
    counter();
  }
  function deleteSelectTasks() {
    arrayTask = arrayTask.filter((value) => value.isChecked === false);
    switch (actual.actual) {
      case 'active':
        showActive();
        break;
      case 'complete':
        showCompleted();
        break;
      default:
        render();
        break;
    }
    checkboxSelectAll.checked = false;
    counter();
  }
  function changeTasks(event) {
    const itemId = Number(event.target.id.split('-')[1]);
    const spanElement = document.querySelector(`#taskText-${itemId}`);
    arrayTask.forEach((element) => {
      if (element.id === itemId) {
        idGlobalArray = itemId;
        const listHtml = document.createElement('input');
        listHtml.innerHTML = '<input id="task-Text" type="text" onBlur="alert">';
        listHtml.value = element.text;
        spanElement.replaceWith(listHtml);
      }
    });
  }
  function addChangeTasks() {
    const taskListInput = document.getElementById('task-Text');
    if (taskListInput === null) return;
    const taskText = taskListInput.value.trim();
    const index = arrayTask.findIndex((item) => item.id === idGlobalArray);
    arrayTask[index].text = taskText;
    render();
  }
  function addTaskPressKey(event) {
    if (event.key === keyEnter) {
      addTaskButton.click();
      addChangeTasks();
    }
    if (event.key === keyEscape) {
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
  paginationDiv.addEventListener('click', selectPage);
})();
