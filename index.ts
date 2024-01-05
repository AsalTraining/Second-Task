//validate input
function validateInput(input: HTMLInputElement): void {
    var regex = /^[a-zA-Z0-9]*$/;
    var value = input.value;
  
    if (!regex.test(value)) {
      input.value = value.replace(/[^a-zA-Z0-9]/g, '');
    }
  }
  const taskInput: HTMLInputElement = document.getElementById("plac") as HTMLInputElement;
  const addTaskButton: HTMLElement = document.getElementById("add") as HTMLElement;
  const taskList: HTMLElement = document.getElementById("ToDoListRegion") as HTMLElement;
  let tasks: Array<string | number> = JSON.parse(localStorage.getItem("tasks") ?? "[]");

  
  //add task
  function addTask(): void {
    const task: string | number = taskInput.value;
  
    if (task) {
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      taskInput.value = "";
    }
  }
  
  addTaskButton.addEventListener("click", addTask);
  renderTasks();
  
  //pop up
  function showPopup(message: string): void {
    const popup: HTMLElement | null = document.getElementById('popup');
    const popupMessage: HTMLElement | null = document.getElementById('popup-message');
    const overlay: HTMLElement | null = document.getElementById('overlay');
  
    if (popup && popupMessage && overlay) {
      popupMessage.textContent = message;
      popup.style.display = 'block';
      overlay.style.display = 'block';
  
      overlay.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
      });
    }
  }
  
  
  function hidePopup(): void {
    const popup: HTMLElement = document.getElementById('popup') as HTMLElement;
    popup.style.display = 'none';
  }
  
  const addButton: HTMLElement = document.getElementById('add') as HTMLElement;
  const deleteTaskButton: HTMLElement = document.getElementById('delete') as HTMLElement;
  
  if (addButton) {
    addButton.addEventListener('click', function () {
      showPopup('Task added successfully!');
    });
  }
  
  if (deleteTaskButton) {
    deleteTaskButton.addEventListener('click', function () {
      showPopup('Task deleted successfully!');
    });
  }
  
  const closePopup: HTMLElement = document.querySelector('.close') as HTMLElement;
  
  if (closePopup) {
    closePopup.addEventListener('click', hidePopup);
  }
  
  //render the page
  let taskCount = 0;
  
  function renderTasks(): void {
    taskList.innerHTML = "";
  
    tasks.forEach(task => {
      const taskContainer: HTMLDivElement = document.createElement("div");
      taskContainer.className = "task-container";
      taskContainer.style.marginBottom = "20px";
  
      const taskParagraph: HTMLParagraphElement = document.createElement("p");
      taskParagraph.textContent = String(task);
      taskParagraph.className = "task-text";
  
      const taskId: number = ++taskCount;
      taskParagraph.id = taskId.toString();
      taskContainer.appendChild(taskParagraph);
  
      const iconsContainer: HTMLDivElement = document.createElement("div");
      iconsContainer.className = "icons";
  
      const checkboxInput: HTMLInputElement = document.createElement("input");
      checkboxInput.type = "checkbox";
      checkboxInput.className = "task-checkbox";
      checkboxInput.addEventListener('click', function () {
        CheckedTasks();
      });
      iconsContainer.appendChild(checkboxInput);
  
      const btn: HTMLButtonElement = document.createElement('button');
      btn.className = "editButton";
      btn.style.border = 'none';
      btn.style.padding = '0';
      btn.style.margin = '0';
      btn.style.backgroundColor = "white";
      const ic: HTMLElement = document.createElement('i');
      ic.className = 'fa-solid fa-pen';
      btn.appendChild(ic);
      iconsContainer.appendChild(btn);
      taskContainer.appendChild(iconsContainer);
      taskList.appendChild(taskContainer);
      btn.onclick = function () {
        edit(btn, taskId);
      };
      const button: HTMLButtonElement = document.createElement('button');
      button.style.border = 'none';
      button.style.padding = '0';
      button.style.margin = '0';
      button.style.backgroundColor = "white";
      const icon: HTMLElement = document.createElement('i');
      icon.className = 'fas fa-trash';
      button.appendChild(icon);
      iconsContainer.appendChild(button);
      taskContainer.appendChild(iconsContainer);
      taskList.appendChild(taskContainer);
      button.onclick = function () {
        del(button,taskId);
      };
    });
  }
  
  //All
  function displayTasks(): void {
    const taskItems: NodeListOf<HTMLElement> = document.querySelectorAll('#ToDoListRegion .task-container');
  
    taskItems.forEach(function (taskItem) {
      const checkbox: HTMLInputElement = taskItem.querySelector('.task-checkbox') as HTMLInputElement;
      const taskName: HTMLElement = taskItem.querySelector('.task-text') as HTMLElement;
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
  function displayCheckedTasks(): void {
    const taskItems: NodeListOf<HTMLElement> = document.querySelectorAll('#ToDoListRegion .task-container');
  
    taskItems.forEach(function (taskItem) {
      const checkbox: HTMLInputElement = taskItem.querySelector('.task-checkbox') as HTMLInputElement;
      const taskName: HTMLElement = taskItem.querySelector('.task-text') as HTMLElement;
  
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
  function displayUnCheckedTasks(): void {
    const taskItems: NodeListOf<HTMLElement> = document.querySelectorAll('#ToDoListRegion .task-container');
  
    taskItems.forEach(function (taskItem) {
      const checkbox: HTMLInputElement = taskItem.querySelector('.task-checkbox') as HTMLInputElement;
      const taskName: HTMLElement = taskItem.querySelector('.task-text') as HTMLElement;
  
      if (checkbox.checked) {
        taskItem.style.display = 'none';
      } else {
        taskItem.style.display = 'block';
      }
    });
  }
  
  //line through
  function CheckedTasks(): void {
    const taskItems: NodeListOf<HTMLElement> = document.querySelectorAll('#ToDoListRegion .task-container');
  
    taskItems.forEach(function (taskItem) {
      const checkbox: HTMLInputElement = taskItem.querySelector('.task-checkbox') as HTMLInputElement;
      const taskName: HTMLElement = taskItem.querySelector('.task-text') as HTMLElement;
  
      if (checkbox.checked) {
        taskName.style.textDecoration = 'line-through';
        taskName.style.color = 'red';
      } else {
        taskName.style.textDecoration = 'none';
        taskName.style.color = 'black';
      }
    });
  }
  
  //icons
  function edit(btn: HTMLButtonElement, taskId: number): void {
    const taskname: HTMLElement | null = btn.closest(".task-container")?.querySelector(".task-text")!;
    const newText: string | null = prompt('Enter the new text for the paragraph:');
    console.log(taskId - 1);
  
    if (newText !== null && taskname !== null) {
      tasks[taskId - 1] = newText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      
      // Check if taskname is not null before accessing properties
      if (taskname) {
        taskname.innerText = newText!;
      }
    }
  }
  
  
  
  
  function del(button: HTMLButtonElement, taskId: number): void {
    const taskContainer: HTMLElement | null = button.closest(".task-container");
  
    if (confirm("Are you sure you want to delete this item?") && taskContainer) {
      taskContainer.remove();
      tasks.splice(taskId - 1, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    showPopup('Task deleted successfully!');
  }
  
  // delete
  function deleteAllTasks(): void {
    if (confirm("Are you sure you want to delete this item?")) {
      tasks = [];
      localStorage.removeItem("tasks");
      renderTasks();
    }
  
    showPopup('Task deleted successfully!');
  }
  
  function deleteDoneTasks(): void {
    if (confirm("Are you sure you want to delete this item?")) {
      const doneTasks = Array.from(document.querySelectorAll(".task-container"))
        .filter(taskContainer => {
          const checkboxInput: HTMLInputElement | null = taskContainer.querySelector("input[type='checkbox']");
          return checkboxInput !== null && checkboxInput.checked;
        });
  
      doneTasks.forEach(doneTask => {
        const taskText: string | null = doneTask.querySelector(".task-text")?.textContent ?? null;
        const taskIndex: number = taskText ? tasks.indexOf(taskText) : -1;
  
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);
        }
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  }  
  showPopup('Task deleted successfully!');
  
  
  
    
  