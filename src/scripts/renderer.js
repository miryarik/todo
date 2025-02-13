import { taskHandler } from "./tasks.js";
import { projectHandler } from "./projects.js";
import { getCards } from "./utils.js";

const sidebar = document.querySelector("sidebar");

function renderTaskList() {
    // get all tasks
    // put them in the sidebar tasks list

    const allTasks = taskHandler.getAllTasks();
    sidebar.querySelector("ul.task-list");

    allTasks.forEach((task) => {
        const taskLi = document.createElement("li");
        taskLi.classList.add("task-list-item");
        taskLi.setAttribute("id", task.id);

        taskLi.innerText = task.name;

        sidebar.querySelector(".tasks ul.task-list").appendChild(taskLi);
    });
}

function renderProjectList() {
    // get all projects
    // put them in the sidebar projects list

    const allProjects = projectHandler.getAllProjects();
    sidebar.querySelector("ul.project-list").innerHTML = "";
    

    allProjects.forEach((project) => {
        const projectLi = document.createElement("li");
        projectLi.classList.add("project-list-item");
        projectLi.setAttribute("id", project.id);

        projectLi.innerText = project.name;

        sidebar
            .querySelector(".projects ul.project-list")
            .appendChild(projectLi);

    });

}


function setupSidebarButtons() {

    const newTaskBtn = document.querySelector("sidebar button#new-task-btn");
    const newProjectBtn = document.querySelector("sidebar button#new-project-btn");

    newTaskBtn.addEventListener("click", () => {
        renderNewTaskDialog();
    });

    newProjectBtn.addEventListener("click", () => {
        renderNewProjectDialog();
    });

}

function renderNewTaskDialog() {

    const dialog = document.querySelector("dialog.new-task-dialog");
    dialog.showModal();

    dialog.querySelector("h1").innerText

}


function renderNewProjectDialog() {
    
    const dialog = document.querySelector("dialog.new-project-dialog");
    dialog.showModal();
    
    dialog.querySelector("h1").innerText = "New Project";
    dialog.querySelector("button").addEventListener("click", () => {

        const name = dialog.querySelector("input#name").value;
        const description = dialog.querySelector("input#name").value;

        projectHandler.createNewProject(name, description);

        renderProjectList();
        renderAllProjects();

    });

}


function renderAllProjects() {
    // get all projects
    // make a card for each project
    // add the cards to container element

    const content = document.querySelector("container content");
    content.setAttribute("class", "all-projects");
    content.innerHTML = "";

    const header = document.querySelector("container header");

    header.innerText = "All Projects";

    const allProjects = projectHandler.getAllProjects();

    const projectCards = getCards(allProjects);

    projectCards.forEach(card => {
        content.appendChild(card);
    });

}

export const contentRenderer = {
    renderAllProjects,
}


export const sidebarRenderer = {
    renderTaskList,
    renderProjectList,
    setupSidebarButtons
};
