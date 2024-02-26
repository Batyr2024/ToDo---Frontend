
document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskDeleted=document.getElementById("taskDeleted");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            arrayTask.push=taskText.value.trim();
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <input class="checkbox" type ="checkbox"></span>
                <span>${taskText}</span>
                <span class="delete">X</span>
                
            `;
            
            listItem.querySelector(".delete").addEventListener("click", function () {
                taskList.removeChild(listItem);
            });

            taskList.appendChild(listItem);
            taskInput.value = "";
        }
    });
taskDeleted.addEventListener("click",function(){
alert(arrayTask[0]);
    alert(arrayTask[1]);
})
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});