//DOM elements selection
const Input = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskButton');
const List = document.getElementById('taskList');   
//basically getting permission to access these elements in the HTML file


//loading saved tasks from localStorage
const savedTasks = localStorage.getItem('tasks');
const tasks = savedTasks ? JSON.parse(savedTasks) : [];
// if we have saved tasks, parse them from JSON, otherwise start with an empty array


//function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    //stringify tasks array and save to localStorage
}

function createToDoNode(task, index) {
    const li = document.createElement('li');//only in memory
    const checkbox = document.createElement('input');//only in memory
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.addEventListener('change', () => {
        tasks[index].completed = checkbox.checked;

        textspan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        saveTasks();
    });
    const textspan = document.createElement('span');
    textspan.textContent = task.text;
    textspan.style.margin = '0 10px';
    if(task.completed) {
        textspan.style.textDecoration = 'line-through';
    }
        textspan.addEventListener("dblclick", () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null) {
                task.text = newText.trim();
                textspan.textContent = task.text;
                saveTasks();
            } 
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        li.appendChild(checkbox);
        li.appendChild(textspan);
        li.appendChild(deleteButton);
        return li;
    }

//function to render tasks on the page
function renderTasks() {
    List.innerHTML = ''; //clear existing tasks

    tasks.forEach((task, index) => {
        const node = createToDoNode(task, index);
        List.appendChild(node);
    });
}

function addTask() {
    const taskText = Input.value.trim();
    if (!taskText) {
        return; 
    }
    tasks.push({ text: taskText, completed: false });
    Input.value = ''; 
    renderTasks();
    saveTasks();
}   
addButton.addEventListener('click', addTask);
renderTasks();