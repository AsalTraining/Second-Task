//validate input
function validateInput(input) {
    var regex = /^[a-zA-Z0-9]*$/;
    var value = input.value;
  
    if (!regex.test(value)) {
      input.value = value.replace(/[^a-zA-Z0-9]/g, '');
    }
}
//pop up
function showPopup(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  popupMessage.textContent = message;
  popup.style.display = 'block';
  overlay.style.display = "block";
  overlay.addEventListener("click", function() {
    popup.style.display = "none";
    overlay.style.display = "none";
  });
}

function hidePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}
const addButton = document.getElementById('add');
const deleteTaskButton = document.getElementById('delete');

if (addButton) {
  addButton.addEventListener('click', function() {

    showPopup('Task added successfully!');
  });
}
if (deleteTaskButton) {
  deleteTaskButton.addEventListener('click', function() {

    showPopup('Task deleted successfully!');
  });
}

const closePopup = document.querySelector('.close');
if (closePopup) {
  closePopup.addEventListener('click', hidePopup);
}
//render the page
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

    const taskId =  ++taskCount;
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
    btn.className="editButton";
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
      edit(btn,taskId);
    };
    const button = document.createElement('button');
    button.className = 'btttttttttn';
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
      del(button,taskId);
    };
  });
}
//All
function displayTasks() {
  const taskItems = document.querySelectorAll('#ToDoListRegion .task-container');
  
  taskItems.forEach(function(taskItem) {
    const checkbox = taskItem.querySelector('.task-checkbox');
    const taskName = taskItem.querySelector('.task-text');
    taskItem.style.display = 'block';

    if (checkbox.checked) {
      taskName.style.textDecoration = 'line-through';
      taskName.style.color = 'red';
    } else {
      taskName.style.textDecoration = 'none';
      taskName.style.color = 'black';
    }
  });
}
//done task
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
//to do task
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
//line through
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
//icons
function edit(btn,taskId) {
  const taskname = btn.closest(".task-container").querySelector(".task-text");
  const newText = prompt('Enter the new text for the paragraph:');
  console.log(taskId-1);
  if (newText !== null) {
    tasks[taskId - 1] = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskname.innerText = newText;
  }
  }
function del(button,taskId)  {
  const taskContainer = button.closest(".task-container");
  if (confirm("Are you sure you want to delete this item?")) {
  if (taskContainer) {
    taskContainer.remove();
    tasks.splice(taskId-1, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }}
  showPopup('Task deleted successfully!');
}
//delete
function deleteAllTasks() {
  if (confirm("Are you sure you want to delete this item?")) {
  tasks = []; 
  localStorage.removeItem("tasks"); 
  renderTasks(); 
  }
}
function deleteDoneTasks() {
  if (confirm("Are you sure you want to delete this item?")) {
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
   showPopup('Task deleted successfully!');
}
const taskInput = document.getElementById("plac");
const addTaskButton = document.getElementById("add");
const taskList = document.getElementById("ToDoListRegion");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//add task
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


