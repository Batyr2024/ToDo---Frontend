document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskDeleted=document.getElementById("taskDeleted");
    let arrayTask=[];
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <input class="checkbox" name="cb" type ="checkbox"></span>
                <span>${taskText}</span>
                <span class="delete">X</span>
                
            `;
            listItem.querySelector(".delete").addEventListener("click", function () {
                taskList.removeChild(listItem);
            });

            taskList.appendChild(listItem);
            taskInput.value = "";
            arrayTask.push(taskText);

        }
    });
taskDeleted.addEventListener("click",function(){
 let items=document.getElementsByTagName("cb");
 for(let i=0;i<items.length;i++){
    str+=items[i].value+"";
    alert(str);
 }
 
})
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});