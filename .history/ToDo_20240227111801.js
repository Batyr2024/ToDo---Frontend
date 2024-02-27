document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskDeleted=document.getElementById("taskDeleted");
    const checkboxSelectAll=document.getElementById("checkboxSelectAll");
    const taskCheckbox=document.getElementsByName("taskCheckbox")
    let arrayTask=[];
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {

            arrayTask.push({
                id: Date.now(),
                text: taskText,
                isChecked:false
            });
            let idarr = arrayTask[arrayTask.length-1].id;
const listItem=document.createElement("li" , "id=${idarr}");
            listItem.innerHTML = `
            
                <input class="checkbox"  name="taskCheckbox" id=${idarr} type ="checkbox"></span>
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
    
    checkboxSelectAll.addEventListener("click" , function(){
        arrayTask.forEach((element, i) => {
        if(arrayTask[i].isChecked==false){
            arrayTask[i].isChecked=true;
            document.getElementById(arrayTask[i].id).checked=true;
        }
        else{
            arrayTask[i].isChecked=false;
            document.getElementById(arrayTask[i].id).checked=false;
        }
        });
    });
    
    taskList.onclick= function(event){
        let target = event.target;
        let element= target.getElementsByName;
        if(element='taskCheckbox'){
            id=element.id;

            if(arrayTask[.indexOf(id)].isChecked==true){
                arrayTask[arrayTask.indexOf(id)].isChecked=false;
            
        }
        else{
            arrayTask[arrayTask.indexOf(id)].isChecked=true;
        };
            
        };
    };

taskDeleted.addEventListener("click" , function(){
    for(var i=0;i<arrayTask.length;i++){
        if(arrayTask[i].isChecked==true){
            let id = arrayTask[i].id;
            
            taskList.removeChild(listItem.id);
        }
    }
});

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});