document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskDeleted=document.getElementById("taskDeleted");
    const checkboxSelectAll=document.getElementById("checkboxSelectAll");
    const taskCheckbox=document.getElementByName("taskCheckbox")
    let arrayTask=[];
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {

            arrayTask.push({
                id: Date.now(),
                text: taskText,
                isChecked:false
            });

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <input class="checkbox" name="taskCheckbox" id=${arrayTask[length-1].id} type ="checkbox"></span>
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
taskDeleted.addEventListener("click" , function(){
alert(arrayTask[1].id);
let id=arrayTask[1].id;
alert(taskCheckbox.id(id));
});
    checkboxSelectAll.addEventListener("click" , function(){
        arrayTask.forEach(element => {
            let id=arrayTask.id;
        arrayTask.isChecked=true;
        
        

        });
    })

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});