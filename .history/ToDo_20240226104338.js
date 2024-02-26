document.addEventListener("DOM",function(){
    const taskInput=document.getElementById("taskInput");
    const btnAddTask=document.getElementById("addTask");
    const taskTable=document.getElementById("taskTable");

    btnAddTask.addEventListener("click",function(){
        const textTask=taskInput.value.trim();
        if(textTask!==""){
            const listItem=document.createElement("li");
            listItem.innerHTML=` 
               <span>${textTask}</span>
               <span class="delete">x</span>
            `;
            listItem.querySelector(".delete").addEventListener("click",function(){
                taskTable.removeChild(listItem);
            });
            taskTable.appendChild(listItem);
            taskInput.value="";
        };

    })
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });
});