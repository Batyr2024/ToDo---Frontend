document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskDelleted=document.getElementById("taskDeleted");
    let arrayTask=new arrayTask();
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        

        if (taskText !== "") {
            
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
taskDelleted.addEventListener("click",function(){

})
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});