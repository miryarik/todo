import { projectHandler, taskHandler, loadCurrentStorage } from "./storageHandler.js"

function displayList() {
    // dummy function to display list of projects

    const allProjects = projectHandler.getAllProjects();
    const ulProj = document.querySelector("#project-list ul");
    ulProj.innerHTML = "";

    allProjects.forEach(project => {
        const li = document.createElement('li');
        li.setAttribute('id', project.id);
        li.innerText = project.name;

        const btn = document.createElement('button');
        btn.innerText = "delete";

        btn.addEventListener("click", () => {
            projectHandler.deleteProject(li.getAttribute('id'));
            displayList();
        });

        li.appendChild(btn);

        ulProj.appendChild(li);

    });


    const allTasks = taskHandler.getAllTasks();
    const ulTask = document.querySelector("#task-list ul");
    ulTask.innerHTML = "";

    allTasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('id', task.id);
        li.innerText = task.name;

        const btn = document.createElement('button');
        btn.innerText = "delete";

        btn.addEventListener("click", () => {
            taskHandler.deleteTask(li.getAttribute('id'));
            displayList();
        });

        li.appendChild(btn);

        ulTask.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    // what whatever we have
    loadCurrentStorage();
    projectHandler.loadProjectsFromStorage();
    taskHandler.loadTasksFromStorage();
    

    const newProjBtn = document.querySelector("button#new-project-btn");
    newProjBtn.addEventListener("click", () => {
        const name = document.querySelector('form#projects-form input#name').value;
        const description = document.querySelector('form input#description').value;

        projectHandler.createNewProject(name, description);

        displayList();
    });

    const newTaskBtn = document.querySelector("button#new-task-btn");
    newTaskBtn.addEventListener("click", () => {
        const name = document.querySelector('form#tasks-form input#name').value;
        const description = document.querySelector('form input#description').value;

        taskHandler.createNewTask(name, description);

        displayList();
    });

    displayList();

});


window.addEventListener('beforeunload', () => {
    // Save current state back to localStorage
    projectHandler.saveProjectsToStorage();
    taskHandler.saveTasksToStorage();

});


