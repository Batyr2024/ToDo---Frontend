(() => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const taskSelectedDeleted = document.getElementById('taskSelectedDeleted');
  const checkboxSelectAll = document.getElementById('checkboxSelectAll');
  const spanAll = document.getElementById('spanAll');
  const spanActive = document.getElementById('spanActive');
  const spanCompleted = document.getElementById('spanCompleted');
  const pAll = document.getElementById('pAll');
  const pActive = document.getElementById('pActive');
  const pCompleted = document.getElementById('pCompleted');
  const paginationDiv = document.getElementById('pagination');
  let maxPageAll = 1;
  let maxPageActive = 1;
  let maxPageComplete = 1;
  let selectPagination = 1;
  let actualTab = 'all';
  const keyEnter = 'Enter';
  const keyEscape = 'Escape';
  const maxTaskPage = 5;
  let idGlobalArray = 1;
  let arrayTask = [];
  const { _ } = window;

  function addPage(lengthArray) {
    const countPages = Math.ceil(lengthArray / maxTaskPage);
    let listHtml = '';
    for (let i = 0; countPages > i; i += 1) {
      switch (actualTab) {
        case 'all':
          if (maxPageAll < selectPagination) {
            listHtml += `<a href="#" class=${maxPageAll === i + 1 ? 'active-page' : 'page'} id=${String(i + 1)}>${String(i + 1)}</a>`;
          } else {
            listHtml += `<a href="#" class=${selectPagination === i + 1 ? 'active-page' : 'page'} id=${String(i + 1)}>${String(i + 1)}</a>`;
          }
          break;
        case 'active':
          if (maxPageActive < selectPagination) {
            listHtml += `<a href="#" class=${maxPageActive === i + 1 ? 'active-page' : 'page'} id=${String(i + 1)}>${String(i + 1)}</a>`;
          } else {
            listHtml += `<a href="#" class=${selectPagination === i + 1 ? 'active-page' : 'page'} id=${String(i + 1)}>${String(i + 1)}</a>`;
          }
          break;
        case 'complete':
          if (maxPageComplete < selectPagination) {
            listHtml += `<a href="#" class=${maxPageComplete === i + 1 ? 'active-page' : 'page'} id=${String(i + 1)}>${String(i + 1)}</a>`;
          } else {
            listHtml += `<a href="#" class=${selectPagination === i + 1 ? 'active-page' : 'page'} id=${String(i + 1)}>${String(i + 1)}</a>`;
          }
          break;
        default: break;
      }
    }
    paginationDiv.innerHTML = '';
    paginationDiv.innerHTML += listHtml;
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
  function counterPage() {
    let arrayTaskPage;
    maxPageAll = Math.ceil(arrayTask.length / maxTaskPage);
    arrayTaskPage = arrayTask.filter((value) => value.isChecked === false);
    maxPageActive = Math.ceil(arrayTaskPage.length / maxTaskPage);
    arrayTaskPage = arrayTask.filter((value) => value.isChecked === true);
    maxPageComplete = Math.ceil(arrayTaskPage.length / maxTaskPage);
    switch (actualTab) {
      case 'all':
        if (selectPagination > maxPageAll) {
          selectPagination = maxPageAll;
        }
        break;
      case 'active':
        if (selectPagination > maxPageActive) {
          selectPagination = maxPageActive;
        }
        break;
      case 'complete':
        if (selectPagination > maxPageComplete) {
          selectPagination = maxPageComplete;
        }
        break;
      default:
        break;
    }
  }

  function render() {
    const endIndex = selectPagination * maxTaskPage;
    const startIndex = endIndex - maxTaskPage;
    let lengthArray;
    let arrayTaskPage;
    switch (actualTab) {
      case 'all':
        arrayTaskPage = arrayTask.slice(startIndex, endIndex);
        lengthArray = arrayTask.length;
        break;
      case 'active':
        arrayTaskPage = arrayTask.filter((value) => value.isChecked === false);
        lengthArray = arrayTaskPage.length;
        arrayTaskPage = arrayTaskPage.slice(startIndex, endIndex);
        break;
      case 'complete':
        arrayTaskPage = arrayTask.filter((value) => value.isChecked === true);
        lengthArray = arrayTaskPage.length;
        arrayTaskPage = arrayTaskPage.slice(startIndex, endIndex);
        break;
      default:
        break;
    }
    let listHtml = '';
    taskList.innerHTML = ' ';
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
    });
    taskList.innerHTML += listHtml;
    counter();
    counterPage();
    addPage(lengthArray);
  }
  function tabAll() {
    actualTab = 'all';
    selectPagination = maxPageAll;
    render();
  }
  function tabActive() {
    actualTab = 'active';
    selectPagination = maxPageActive;
    render();
  }
  function tabCompleted() {
    actualTab = 'complete';
    selectPagination = maxPageComplete;
    render();
  }
  function selectPage(event) {
    if (event.target.className === 'page') {
      selectPagination = Number(event.target.id);
      render();
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
    switch (actualTab) {
      case 'all':
        selectPagination = Math.ceil(arrayTask.length / maxTaskPage);
        break;
      case 'active':
        selectPagination = maxPageActive;
        break;
      default:
        break;
    }
    render();
    counter();
    taskInput.value = '';
  }
  function selectAllCheckboxTasks(event) {
    arrayTask.forEach((element) => {
      const arrayElement = element;
      arrayElement.isChecked = event.target.checked;
    });
    render();
    counter();
  }
  function checkboxClicksTasks(event) {
    if (event.target.className === 'checkbox') {
      const elementId = Number(event.target.id);
      const index = arrayTask.findIndex((item) => item.id === elementId);
      let checkedAllTrue = false;
      if (arrayTask[index].isChecked === false) {
        arrayTask[index].isChecked = true;
      } else {
        arrayTask[index].isChecked = false;
      } render();
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
    }
    counterPage();
    render();
    counter();
  }
  function deleteSelectTasks() {
    arrayTask = arrayTask.filter((value) => value.isChecked === false);
    counterPage();
    render();
    checkboxSelectAll.checked = false;
    counter();
  }
  function changeTasks(event) {
    const itemId = Number(event.target.id.split('-')[1]);
    const spanElement = document.querySelector(`#taskText-${itemId}`);
    console.log(itemId);
    arrayTask.forEach((element) => {
      console.log(element.id);
      if (element.id === itemId) {
        idGlobalArray = itemId;
        const listHtml = document.createElement('input');
        listHtml.innerHTML = '<input type="text" onBlur="alert">';
        listHtml.value = element.text;
        listHtml.id = 'taskText';
        spanElement.replaceWith(listHtml);
      }
    });
  }
  function addChangeTasks() {
    const taskListInput = document.getElementById('taskText');
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
  taskList.addEventListener('click', checkboxClicksTasks);
  taskList.addEventListener('click', deleteThisTask);
  taskSelectedDeleted.addEventListener('click', deleteSelectTasks);
  taskInput.addEventListener('keyup', addTaskPressKey);
  taskList.addEventListener('dblclick', changeTasks);
  taskList.addEventListener('keyup', addTaskPressKey);
  taskList.addEventListener('blur', addChangeTasks, true);
  pAll.addEventListener('click', tabAll);
  pActive.addEventListener('click', tabActive);
  pCompleted.addEventListener('click', tabCompleted);
  paginationDiv.addEventListener('click', selectPage);
})();
