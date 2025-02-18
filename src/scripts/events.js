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
        projectDialog.querySelector("form").reset();
    });

    taskDialog.querySelector("button").addEventListener("click", () => {
        const name = taskDialog.querySelector("input#name").value;
        const description = taskDialog.querySelector("input#description").value;
        const dueDate = taskDialog.querySelector("input#due-date").value;
        const priority = Number(taskDialog.querySelector("select#priority").value);
        const projectId = taskDialog.querySelector("select#project").value;

        taskHandler.createNewTask(
            name,
            description,
            dueDate,
            priority,
            projectId
        );

        sidebarRenderer.renderTaskList();
        contentRenderer.renderAllTasks();

        taskDialog.close();
        taskDialog.querySelector("form").reset();
    });
}

function setupSidebarButtons() {
    const newTaskBtn = document.querySelector("sidebar button#new-task-btn");
    const newProjectBtn = document.querySelector(
        "sidebar button#new-project-btn"
    );

    newTaskBtn.addEventListener("click", () => {
        const project = document.querySelector("content.project");
        let projectId;

        if (project) {
            projectId = project.getAttribute("id");
        }
        renderNewTaskDialog(projectId);
    });

    newProjectBtn.addEventListener("click", () => {
        renderNewProjectDialog();
    });
}

function renderNewTaskDialog(projectId) {
    // use the projectId to attach the task to the project
    // get all projects
    // make a select list with projects as options
    // set the default selected using the passed project Id

    const dialog = document.querySelector("dialog.new-task-dialog");

    const projectSelect = document.querySelector("select#project");

    const allProjects = projectHandler.getAllProjects();

    allProjects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.id;
        option.text = project.name;
        projectSelect.appendChild(option);

        if (project.id == projectId) {
            option.setAttribute("selected", "selected");
        }
    });

    dialog.showModal();
    dialog.querySelector("h1").innerText = "New Task";
}

function renderNewProjectDialog() {
    const dialog = document.querySelector("dialog.new-project-dialog");
    dialog.showModal();
    dialog.querySelector("h1").innerText = "New Project";
}

export function initSidebarEvents() {
    // sidebar navigation to upcoming, projects and tasks

    const tasksHead = document.querySelector("sidebar .tasks h1");
    const projectsHead = document.querySelector("sidebar .projects h1");
    const upcomingHead = document.querySelector("sidebar .upcoming");

    tasksHead.addEventListener("click", () => {
        contentRenderer.renderAllTasks();
    });

    projectsHead.addEventListener("click", () => {
        contentRenderer.renderAllProjects();
    });

    upcomingHead.addEventListener("click", () => {
        contentRenderer.renderUpcoming();
    });

    setupSidebarButtons();
    initDialogEvents();
}
