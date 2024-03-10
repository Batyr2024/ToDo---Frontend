(() => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const taskSelectedDeleted = document.getElementById('taskSelectedDeleted');
  const checkboxSelectAll = document.getElementById('checkboxSelectAll');
  const spanAll = document.getElementById('spanAll');
  const spanActive = document.getElementById('spanActive');
  const spanCompleted = document.getElementById('spanCompleted');
  const process = document.getElementById('containerProcess');
  const paginationDiv = document.getElementById('pagination');

  let maxPageAll = 1;
  let maxPageActive = 1;
  let maxPageComplete = 1;
  let selectPagination = 1;
  let idGlobalArray = 1;
  let arrayTask = [];
  let actualTab = 'all';
  const keyEnter = 'Enter';
  const keyEscape = 'Escape';
  const maxTaskPage = 5;
  const { _ } = window;
  
function backlightCurrentPage(maxPage,index){
  let listHtml = '';
  if (maxPage < selectPagination) {
    listHtml += `<a href="#" class=${maxPage === index + 1 ? 'active-page' : 'page'} id=${String(index + 1)}>${String(index + 1)}</a>`;
  } else {
    listHtml += `<a href="#" class=${selectPagination === index + 1 ? 'active-page' : 'page'} id=${String(index + 1)}>${String(index + 1)}</a>`;
  }
  return listHtml;
}
  function addPage(lengthArray) {
    const countPages = Math.ceil(lengthArray / maxTaskPage);
    let listHtml = '';
    for (let i = 0; countPages > i; i += 1) {
      switch (actualTab) {
        case 'all':
          listHtml += backlightCurrentPage(maxPageAll,i);
          break;
        case 'active':
          listHtml += backlightCurrentPage(maxPageActive,i);
          break;
        case 'complete':
          listHtml += backlightCurrentPage(maxPageComplete,i);
          break;
        default: break;
      }
    }
    paginationDiv.innerHTML = '';
    paginationDiv.innerHTML += listHtml;
  }
  function counter() {
    spanAll.innerText = 'All:0';
    spanActive.innerText = 'Active:0';
    spanCompleted.innerText = 'Completed:0';
    const arrayActive = arrayTask.filter((value) => !value.isChecked);
    const arrayCompleted = arrayTask.filter((value) => value.isChecked);
    spanActive.innerText = `Active:${String(arrayActive.length)}`;
    spanCompleted.innerText =`Completed:${String(arrayCompleted.length)}`;
    spanAll.innerText = `All:${String((arrayActive.length) + (arrayCompleted.length))}`;
  }
  function counterPage() {
    let arrayTaskPage;
    maxPageAll = Math.ceil(arrayTask.length / maxTaskPage);
    arrayTaskPage = arrayTask.filter((value) => !value.isChecked);
    maxPageActive = Math.ceil(arrayTaskPage.length / maxTaskPage);
    arrayTaskPage = arrayTask.filter((value) => value.isChecked);
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
      default:break;
    }
  }
  function backlightCurrentTab() {
    spanAll.className = '';
    spanActive.className = '';
    spanCompleted.className = '';
    switch (actualTab) {
      case 'all':
        spanAll.className = 'active-tab';
        break;
      case 'active':
        spanActive.className = 'active-tab';
        break;
      case 'complete':
        spanCompleted.className = 'active-tab';
        break;
      default:break;
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
        arrayTaskPage = arrayTask.filter((value) => !value.isChecked);
        lengthArray = arrayTaskPage.length;
        arrayTaskPage = arrayTaskPage.slice(startIndex, endIndex);
        break;
      case 'complete':
        arrayTaskPage = arrayTask.filter((value) => value.isChecked);
        lengthArray = arrayTaskPage.length;
        arrayTaskPage = arrayTaskPage.slice(startIndex, endIndex);
        break;
      default:break;
    }
    let listHtml = '';
    taskList.innerHTML = ' ';
    arrayTaskPage.forEach((element) => {
      const idCheckbox = element.id;
      const taskText = element.text;
      listHtml += `
  <li>
  <input class="checkbox" ${element.isChecked ? 'checked' : ''} id=${idCheckbox} type ="checkbox">
  <span class="span" id="taskText-${idCheckbox}" >${_.escape(taskText)}</span>
  <span id=${idCheckbox} class="delete">X</span>
  </li>
      `;
    });
    taskList.innerHTML += listHtml;
    backlightCurrentTab();
    counter();
    counterPage();
    addPage(lengthArray);
  }

  function Tab(event) {
    switch (event.target.id) {
      case 'spanAll':
        actualTab = 'all';
        selectPagination = maxPageAll;
        break;
      case 'spanActive':
        actualTab = 'active';
        selectPagination = maxPageActive;
        break;
      case 'spanCompleted':
        actualTab = 'complete';
        selectPagination = maxPageComplete;
        break;
      default: break;
    }
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
      text: _.escape(taskText),
      isChecked: false,
    });
    switch (actualTab) {
      case 'all': selectPagination = Math.ceil(arrayTask.length / maxTaskPage);
        break;
      case 'active': selectPagination = maxPageActive;
        break;
      default: break;
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
    counterPage();
    render();
    counter();
  }
  function checkboxClicksTasks(event) {
    if (event.target.className === 'checkbox') {
      const elementId = Number(event.target.id);
      const index = arrayTask.findIndex((item) => item.id === elementId);
      if (arrayTask[index].isChecked === false) {
        arrayTask[index].isChecked = true;
      } else {
        arrayTask[index].isChecked = false;
      } render();
      checkboxSelectAll.checked = arrayTask.every((item) => item.isChecked);
    }
  }
  function deleteThisTask(event) {
    const elementClass = event.target.className;
    const elementId = event.target.id;
    if (elementClass === 'delete') {
      const index = arrayTask.findIndex((item) => item.id === Number(elementId));
      arrayTask.splice(index, 1);
      counterPage();
      render();
      counter();
    }
  }
  function deleteSelectTasks() {
    arrayTask = arrayTask.filter((value) => !value.isChecked);
    counterPage();
    render();
    checkboxSelectAll.checked = false;
    counter();
  }
  function taskChange(event) {
    if (event.detail > 1) {
      const itemId = Number(event.target.id.split('-')[1]);
      const spanElement = document.querySelector(`#taskText-${itemId}`);
      arrayTask.forEach((element) => {
        if (element.id === itemId) {
          idGlobalArray = itemId;
          const listHtml = document.createElement('textarea');
          listHtml.innerHTML = '';
          listHtml.value = _.escape(element.text);
          listHtml.id = 'taskText';
          listHtml.wrap = 'soft';
          listHtml.autofocus = 'on';
          spanElement.replaceWith(listHtml);
        }
      });
    }
  }
  function addChangeTasks() {
    const taskListInput = document.getElementById('taskText');
    if (taskListInput === null) return;
    const taskText = taskListInput.value.trim();
    const index = arrayTask.findIndex((item) => item.id === idGlobalArray);
    arrayTask[index].text = _.escape(taskText);
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
  checkboxSelectAll.addEventListener('change', selectAllCheckboxTasks);
  taskSelectedDeleted.addEventListener('click', deleteSelectTasks);
  taskInput.addEventListener('keyup', addTaskPressKey);
  taskList.addEventListener('click', taskChange);
  taskList.addEventListener('change', checkboxClicksTasks);
  taskList.addEventListener('click', deleteThisTask);
  taskList.addEventListener('keyup', addTaskPressKey);
  taskList.addEventListener('blur', addChangeTasks, true);
  process.addEventListener('click',Tab);
  paginationDiv.addEventListener('click', selectPage);
})();
