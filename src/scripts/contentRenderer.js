import { taskHandler } from "./tasks.js";
import { projectHandler } from "./projects.js";
import { getCards, getBullets } from "./utils.js";

const content = document.querySelector("container content");

function renderAllProjects() {
    // get all projects
    // make a card for each project
    // add the cards to container element

    content.setAttribute("class", "all-projects");
    content.innerHTML = "";

    const header = document.querySelector("container header");
    header.innerText = "All Projects";

    const allProjects = projectHandler.getAllProjects();
    const projectCards = getCards(allProjects);

    projectCards.forEach((card) => {
        content.appendChild(card);
    });
}


function renderAllTasks() {
    // get all tasks
    // make a list bullet for each task
    // add the tasks to container element

    content.setAttribute("class", "all-tasks");
    content.innerHTML = "";

    const header = document.querySelector("container header");
    header.innerText = "All Tasks";

    const allTasks = taskHandler.getAllTasks();
    const taskBullets = getBullets(allTasks);

    taskBullets.forEach((bullet) => {
        content.appendChild(bullet);
    });
}

function renderTasks(tasks) {
    const list = document.createElement("ul");
    content.appendChild(list);

    tasks.forEach((task) => {
        const taskLi = document.createElement("li");
        taskLi.setAttribute("id", task.id);
        taskLi.innerText = task.name;

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.innerText = "Delete";
        taskLi.appendChild(deleteTaskBtn);
        deleteTaskBtn.addEventListener("click", () => {
            taskHandler.deleteTask(task.id);
        });

        list.appendChild(taskLi);
    });
}

function renderProject(projectId) {
    const project = projectHandler.getProjectById(projectId);

    if (project) {
        const header = document.querySelector("container header");
        header.innerText = project.name;

        content.setAttribute("class", "project");
        content.innerHTML = project.description;

        // need to render these task list
        const tasks = taskHandler.getTasksByProjectId(projectId);
        renderTasks(tasks);
    }
}

export const contentRenderer = {
    renderAllProjects,
    renderAllTasks,
    renderProject,
    renderTasks,
};
