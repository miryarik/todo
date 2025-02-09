import { projectHandler, loadCurrentStorage } from "./storageHandler.js"

function displayList() {
    // dummy function to display list of projects

    const allProjects = projectHandler.getAllProjects();
    const ul = document.querySelector("#project-list ul");
    ul.innerHTML = "";

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

        ul.appendChild(li);

    });
}


document.addEventListener("DOMContentLoaded", () => {
    // what whatever we have
    loadCurrentStorage();
    projectHandler.loadProjectsFromStorage();

    const btn = document.querySelector("button#new-project-btn");
    btn.addEventListener("click", () => {
        const name = document.querySelector('form input#name').value;
        const description = document.querySelector('form input#description').value;

        projectHandler.createNewProject(name, description);

        displayList();
    });

    displayList();

});


window.addEventListener('beforeunload', () => {
    // Save current state back to localStorage
    projectHandler.saveProjectsToStorage();
});


