function validateInput(input) {
    var regex = /^[a-zA-Z0-9]*$/;
    var value = input.value;
  
    if (!regex.test(value)) {
      input.value = value.replace(/[^a-zA-Z0-9]/g, '');
    }
  }
/******************************************** */
const taskInput = document.getElementById("plac");
const addTaskButton = document.getElementById("add");
const taskList = document.getElementById("ToDoListRegion");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function deleteAllTasks() {
  tasks = []; 
  localStorage.removeItem("tasks"); 
  renderTasks(); 
}
function deleteDoneTasks() {
  const doneTasks = Array.from(document.querySelectorAll(".task-container"))
    .filter(taskContainer => {
      const checkboxInput = taskContainer.querySelector("input[type='checkbox']");
      return checkboxInput.checked; 
    });

  doneTasks.forEach(doneTask => {
    const taskText = doneTask.querySelector(".task-text").textContent;
    const taskIndex = tasks.indexOf(taskText);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1); 
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  renderTasks(); 
}
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.style.marginBottom = "20px"; 

    const taskParagraph = document.createElement("p");
    taskParagraph.textContent = task;
    taskParagraph.className = "task-text";
    taskContainer.appendChild(taskParagraph);

    const iconsContainer = document.createElement("div");
    iconsContainer.className = "icons";

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    iconsContainer.appendChild(checkboxInput);

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen";
    iconsContainer.appendChild(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    iconsContainer.appendChild(deleteIcon);

    taskContainer.appendChild(iconsContainer);
    taskList.appendChild(taskContainer);

  });
}
function addTask() {
    const task = taskInput.value;
    if (task) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        taskInput.value = "";
    }
}
addTaskButton.addEventListener("click", addTask);
renderTasks();
