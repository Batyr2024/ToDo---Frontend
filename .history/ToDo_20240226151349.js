document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const taskDeleted=document.getElementById("taskDeleted");
    const checkboxSelectAll=document.getElementById("checkboxSelectAll");
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
taskDeleted.addEventListener("click" , function(){
 var items=document.getElementsByTagName("cb");
 for(var i=0;i<items.length;i++){
    if(items[i].checked){
        items[i].parentNode.removeChild(items[i]);
    }
    
 }
 alert(str);
})
checkboxSelectAll.addEventListener("click" , function(){
    var items=document.getElementsByTagName("input type=checkbox");
    for(var i=0;i<items.length;i++){
        items[i]=checked(true);
}});
    

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});