import { taskHandler } from "./tasks.js";
import { projectHandler } from "./projects.js";
import { getCards, dayFromDate, formatDate } from "./utils.js";

const content = document.querySelector("container content");

function getBullets(tasks) {
    const bullets = [];
    
    tasks.forEach((task) => {
        const bullet = document.createElement("li");
        bullet.setAttribute("id", task.id);
        bullet.setAttribute("class", "task-bullet");

        const name = document.createElement("h3");
        name.innerText = task.name;

        const description = document.createElement("p");
        description.innerText = task.description;

        const optionsDiv = document.createElement("div");
        optionsDiv.setAttribute("class", "options");
        const deleteButton = document.createElement("button");
        optionsDiv.appendChild(deleteButton);
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", () => {
            taskHandler.deleteTask(task.id);
            sidebarRenderer.renderTaskList();
            contentRenderer.renderAllTasks();
        });

        const infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", "info");
        const date = document.createElement("p");
        const priority = document.createElement("p");

        const dateText = dayFromDate(formatDate(task.dueDate));
        date.innerText = dateText;
        switch (dateText) {
            case "Today":
                bullet.classList.add("today");
                break;

            case "Tomorrow":
                bullet.classList.add("tomorrow");
                break;
        }

        switch (task.priority) {
            case 3:
                priority.innerText = "High";
                break;

            case 2:
                priority.innerText = "Normal";
                break;

            case 1:
                priority.innerText = "Low";
                break;
        }

        infoDiv.appendChild(date);
        infoDiv.appendChild(priority);

        bullet.appendChild(name);
        bullet.appendChild(description);
        bullet.appendChild(optionsDiv);
        bullet.appendChild(infoDiv);

        bullets.push(bullet);
    });

    return bullets;
}

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

function renderProject(projectId) {
    const project = projectHandler.getProjectById(projectId);

    if (project) {
        const header = document.querySelector("container header");
        header.innerText = project.name;

        content.setAttribute("class", "project");
        content.setAttribute("id", projectId);
        content.innerHTML = project.description;

        // render task list
        const list = document.createElement("ul");
        content.appendChild(list);
        const tasks = taskHandler.getTasksByProjectId(projectId);
        const taskBullets = getBullets(tasks);
        taskBullets.forEach((bullet) => {
            list.appendChild(bullet);
        });
    }
}

function renderUpcoming() {
    // render a bullet list of all upcoming tasks

    content.setAttribute("class", "upcoming");
    content.innerHTML = "";
    
    const header = document.querySelector("container header");
    header.innerText = "Coming Tasks";
    
    const upcomingTasks = taskHandler.getUpcomingTasks();    
    const taskBullets = getBullets(upcomingTasks);

    taskBullets.forEach((bullet) => {
        content.appendChild(bullet);
    });

}

export const contentRenderer = {
    renderAllProjects,
    renderAllTasks,
    renderProject,
    renderUpcoming
};
