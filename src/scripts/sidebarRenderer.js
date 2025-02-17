import { taskHandler } from "./tasks.js";
import { projectHandler } from "./projects.js";

const sidebar = document.querySelector("sidebar");

function renderTaskList() {
    // get all tasks
    // put them in the sidebar tasks list

    const allTasks = taskHandler.getAllTasks();
    sidebar.querySelector("ul.task-list").innerHTML = "";

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

export const sidebarRenderer = {
    renderTaskList,
    renderProjectList,
};
