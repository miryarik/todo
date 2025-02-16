import { projectHandler } from "./projects.js";
import { sidebarRenderer } from "./sidebarRenderer.js";
import { contentRenderer } from "./contentRenderer.js";
import { taskHandler } from "./tasks.js";

function initDialogEvents() {
    // project and task lists show update to reflect changes
    // add a new project / task
    // re-render lists
    // update the main content

    const projectDialog = document.querySelector("dialog.new-project-dialog");
    const taskDialog = document.querySelector("dialog.new-task-dialog");

    projectDialog.querySelector("button").addEventListener("click", () => {
        const name = projectDialog.querySelector("input#name").value;
        const description =
            projectDialog.querySelector("input#description").value;

        projectHandler.createNewProject(name, description);

        sidebarRenderer.renderProjectList();
        contentRenderer.renderAllProjects();

        projectDialog.close();
    });

    taskDialog.querySelector("button").addEventListener("click", () => {
        const name = taskDialog.querySelector("input#name").value;
        const description = taskDialog.querySelector("input#description").value;

        taskHandler.createNewTask(name, description);

        sidebarRenderer.renderTaskList();
        contentRenderer.renderAllTasks();

        taskDialog.close();
    });
}

function setupSidebarButtons() {
    const newTaskBtn = document.querySelector("sidebar button#new-task-btn");
    const newProjectBtn = document.querySelector(
        "sidebar button#new-project-btn"
    );

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
    dialog.querySelector("h1").innerText = "New Task";
}

function renderNewProjectDialog() {
    const dialog = document.querySelector("dialog.new-project-dialog");
    dialog.showModal();
    dialog.querySelector("h1").innerText = "New Project";
}

export function initSidebarEvents() {
    // sidebar navigation to projects and tasks

    const tasksHead = document.querySelector("sidebar h1");

    tasksHead.addEventListener("click", () => {
        contentRenderer.renderAllTasks();
    });

    setupSidebarButtons();
    initDialogEvents();
}
