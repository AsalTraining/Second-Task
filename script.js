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
function CheckedTasks() {
  const taskItems = document.querySelectorAll('#ToDoListRegion .task-container');
  taskItems.forEach(function(taskItem) {
    const checkbox = taskItem.querySelector('.task-checkbox');
    const taskName = taskItem.querySelector('.task-text');
    
    if (checkbox.checked) 
    {
      taskName.style.textDecoration = 'line-through';
      taskName.style.color = 'red';
    } 
    else 
    {
      taskName.style.textDecoration = 'none';
      taskName.style.color = 'black';
    }
  });
}


function del(button) {
  const taskContainer = button.closest(".task-container");

  if (taskContainer) {
    taskContainer.remove();

    // Update 'tasks' array and localStorage
    const taskId = taskContainer.querySelector(".task-text").id;
    const taskIndex = tasks.indexOf(taskId);

    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
}
function edit(btn) {
const taskname = btn.closest(".task-container").querySelector(".task-text");
const newText = prompt('Enter the new text for the paragraph:');
  if (newText !== null) {
    taskname.innerText = newText;
  }
}
let taskCount=0;
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.style.marginBottom = "20px"; 

    const taskParagraph = document.createElement("p");
    taskParagraph.textContent = task;
    taskParagraph.className = "task-text";

    const taskId = "task" + (++taskCount);
    taskParagraph.id = taskId;
    taskContainer.appendChild(taskParagraph);

    const iconsContainer = document.createElement("div");
    iconsContainer.className = "icons";

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.className = "task-checkbox";
    checkboxInput.addEventListener('click', function() {
      CheckedTasks();
    });
    iconsContainer.appendChild(checkboxInput);

    const btn = document.createElement('button');
    btn.style.border = 'none';
    btn.style.padding = '0';   
    btn.style.margin = '0';   
    btn.style.backgroundColor="white";
    const ic = document.createElement('i');
    ic.className = 'fa-solid fa-pen';
    btn.appendChild(ic);
    iconsContainer.appendChild(btn);
    taskContainer.appendChild(iconsContainer);
    taskList.appendChild(taskContainer);
    btn.onclick = function() {
      edit(btn);
    };
    const button = document.createElement('button');
    button.style.border = 'none';
    button.style.padding = '0';   
    button.style.margin = '0';   
    button.style.backgroundColor="white";
    const icon = document.createElement('i');
    icon.className = 'fas fa-trash';
    button.appendChild(icon);
    iconsContainer.appendChild(button);
    taskContainer.appendChild(iconsContainer);
    taskList.appendChild(taskContainer);
    button.onclick = function() {
      del(button);
    };
  });
}
function displayCheckedTasks() {
  const taskItems = document.querySelectorAll('#ToDoListRegion .task-container');
  taskItems.forEach(function(taskItem) {
    const checkbox = taskItem.querySelector('.task-checkbox');
    const taskName = taskItem.querySelector('.task-text');
    
    if (checkbox.checked) {
      taskItem.style.display = 'block';
      taskName.style.textDecoration = 'none';
      taskName.style.color = 'black';
    } else {
      taskItem.style.display = 'none';
      taskName.style.textDecoration = 'none';
      taskName.style.color = 'black';
    }
  });
}
function displayUnCheckedTasks() {
  const taskItems = document.querySelectorAll('#ToDoListRegion .task-container');
  taskItems.forEach(function(taskItem) {
    const checkbox = taskItem.querySelector('.task-checkbox');
    const taskName = taskItem.querySelector('.task-text');
    
    if (checkbox.checked) {
      taskItem.style.display = 'none';
    } else {
      taskItem.style.display = 'block';
    }
  });
}
function displayTasks() {
  const taskItems = document.querySelectorAll('#ToDoListRegion .task-container');
  
  taskItems.forEach(function(taskItem) {
    const checkbox = taskItem.querySelector('.task-checkbox');
    const taskName = taskItem.querySelector('.task-text');
    
    // Always show the task
    taskItem.style.display = 'block';

    if (checkbox.checked) {
      taskName.style.textDecoration = 'none';
      taskName.style.color = 'black';
    } else {
      taskName.style.textDecoration = 'none';
      taskName.style.color = 'black';
    }
  });
}



function showPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');

  // Set the popup message
  popupMessage.textContent = message;

  // Display the popup
  popup.style.display = 'block';
  setTimeout(hidePopup, 3000);
}

function hidePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

const addButton = document.getElementById('add');
const deleteTaskButton = document.getElementById('delete');

if (addButton) {
  addButton.addEventListener('click', function() {
    // Add task logic here
    
    // Show the popup
    showPopup('Task added successfully!');
  });
}

if (deleteTaskButton) {
  deleteTaskButton.addEventListener('click', function() {
    // Delete task logic here
    
    // Show the popup
    showPopup('Task deleted successfully!');
  });
}

const closePopup = document.querySelector('.close');
if (closePopup) {
  closePopup.addEventListener('click', hidePopup);
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
