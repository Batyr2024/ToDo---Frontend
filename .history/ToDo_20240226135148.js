let arrayTask=[];


document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskDeleted=document.getElementById("taskDeleted");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <input class="checkbox" id="checkbox[]" type ="checkbox"></span>
                <span>${taskText}</span>
                <span class="delete">X</span>
                
            `;
            
            let idCheckbox=document.getElementById("checkbox[]");
            
            listItem.querySelector(".delete").addEventListener("click", function () {
                taskList.removeChild(listItem);
            });

            taskList.appendChild(listItem);
            taskInput.value = "";
            arrayTask.push(taskText&idCheckbox.checked);

        }
    });
taskDeleted.addEventListener("click",function(){
 
    alert(arrayTask[1]);
})
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});