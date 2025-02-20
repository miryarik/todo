import { projectHandler } from "./projects.js";
import { sidebarRenderer } from "./sidebarRenderer.js";
import { contentRenderer } from "./contentRenderer.js";
import { taskHandler } from "./tasks.js";

function initDialogEvents() {
    // project and task lists show update to reflect changes
    // add a new project / task
    // re-render lists
    // update the main content

    const newProjectDialog = document.querySelector("dialog.new-project-dialog");
    const editProjectDialog = document.querySelector("dialog.edit-project-dialog")
    const newTaskDialog = document.querySelector("dialog.new-task-dialog");
    const editTaskDialog = document.querySelector("dialog.edit-task-dialog");

    newProjectDialog.querySelector("button").addEventListener("click", (event) => {
        event.preventDefault();
        
        const name = newProjectDialog.querySelector("input#new-project-name").value;
        const description = newProjectDialog.querySelector("textarea#new-project-description").value;

        newProjectDialog.querySelector("button").blur();
        if (name) {
            projectHandler.createNewProject(name, description);
            
            sidebarRenderer.renderProjectList();
            initSidebarEvents();
            contentRenderer.renderAllProjects();
            
            newProjectDialog.querySelector("form").reset();
            newProjectDialog.close();
        }
    });

    editProjectDialog.querySelector("button").addEventListener("click", (event) => {
        event.preventDefault();

        const name = editProjectDialog.querySelector("input#edit-project-name").value;
        const description = editProjectDialog.querySelector("textarea#edit-project-description").value;
        const projectId = editProjectDialog.getAttribute("id");
        
        editProjectDialog.querySelector("button").blur();
        if (name) {
            projectHandler.updateProject(projectId, name, description);
    
            sidebarRenderer.renderProjectList();
            initSidebarEvents();
            contentRenderer.renderAllProjects();
    
            editProjectDialog.querySelector("form").reset();
            editProjectDialog.close();
        }

    });

    newTaskDialog.querySelector("button").addEventListener("click", (event) => {
        event.preventDefault();

        const name = newTaskDialog.querySelector("input#new-task-name").value;
        const description = newTaskDialog.querySelector("textarea#new-task-description").value;
        const dueDate = newTaskDialog.querySelector("input#due-date").value;
        const priority = Number(newTaskDialog.querySelector("select#priority").value);
        const projectId = newTaskDialog.querySelector("select#project").value;
        
        newTaskDialog.querySelector("button").blur();
        if (name) {
            taskHandler.createNewTask(
                name,
                description,
                dueDate,
                priority,
                projectId
            );

            sidebarRenderer.renderTaskList();
            initSidebarEvents();
            contentRenderer.renderAllTasks();

            newTaskDialog.querySelector("form").reset();
            newTaskDialog.close();
        }

    });

    editTaskDialog.querySelector("button").addEventListener("click", (event) => {
        event.preventDefault();

        const taskId = editTaskDialog.getAttribute("id");
        const name = editTaskDialog.querySelector("input#edit-task-name").value;
        const description = editTaskDialog.querySelector("textarea#edit-task-description").value;
        const dueDate = editTaskDialog.querySelector("input#due-date").value;
        const priority = Number(editTaskDialog.querySelector("select#priority").value);
        const projectId = editTaskDialog.querySelector("select#project").value;
        
        editTaskDialog.querySelector("button").blur();

        if (name) {
            taskHandler.updateTask(
                taskId,
                name,
                description,
                dueDate,
                priority,
                projectId
            );

            sidebarRenderer.renderTaskList();
            initSidebarEvents();
            contentRenderer.renderAllTasks();

            editTaskDialog.querySelector("form").reset();
            editTaskDialog.close();
        }

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

    const projectSelect = dialog.querySelector("select#project");
    projectSelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.innerText = "None";
    projectSelect.appendChild(defaultOption);

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

export function renderEditTaskDialog(taskId) {
    // use the task id to render dialog
    // update the task on submit

    const task = taskHandler.getTaskById(taskId);
    
    const dialog = document.querySelector("dialog.edit-task-dialog");
    dialog.setAttribute("id", taskId);
    dialog.querySelector("input#edit-task-name").value = task.name;
    dialog.querySelector("textarea#edit-task-description").value = task.description;
    dialog.querySelector("input#due-date").value = task.dueDate;
    dialog.querySelector("select#priority").value = task.priority;

    const projectSelect = dialog.querySelector("select#project");
    projectSelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.innerText = "None";
    projectSelect.appendChild(defaultOption);

    const allProjects = projectHandler.getAllProjects();

    allProjects.forEach((project) => {
        const option = document.createElement("option");
        option.value = project.id;
        option.text = project.name;

        projectSelect.appendChild(option);

        if (project.id == task.projectId) {
            option.setAttribute("selected", "selected");
        }
    });

    dialog.showModal();
    dialog.querySelector("h1").innerText = "Edit Task";
}

function renderNewProjectDialog() {
    const dialog = document.querySelector("dialog.new-project-dialog");
    dialog.showModal();
    dialog.querySelector("h1").innerText = "New Project";
}

export function renderEditProjectDialog(projectId) {
    const dialog = document.querySelector("dialog.edit-project-dialog");
    dialog.setAttribute("id", projectId);

    const project = projectHandler.getProjectById(projectId);
    
    dialog.querySelector("input#edit-project-name").value = project.name;
    dialog.querySelector("textarea#edit-project-description").value = project.description;
    dialog.showModal();
    dialog.querySelector("h1").innerText = "Edit Project";
}

export function initSidebarEvents() {
    // sidebar navigation to upcoming, projects and tasks

    const tasksHead = document.querySelector("sidebar .tasks");
    const projectsHead = document.querySelector("sidebar .projects");
    const upcomingHead = document.querySelector("sidebar .upcoming");

    tasksHead.querySelector("h1").addEventListener("click", () => {
        contentRenderer.renderAllTasks();
    });

    projectsHead.querySelector("h1").addEventListener("click", () => {
        contentRenderer.renderAllProjects();
    });

    upcomingHead.addEventListener("click", () => {
        contentRenderer.renderUpcoming();
    });

    tasksHead.querySelectorAll(".task-list-item").forEach(taskItem => {
        const taskId = taskItem.getAttribute("id");
        taskItem.addEventListener("click", () => {
            renderEditTaskDialog(taskId);
        });
    });

    projectsHead.querySelectorAll(".project-list-item").forEach(projectItem => {
        const projectId = projectItem.getAttribute("id");
        projectItem.addEventListener("click", () => {
            contentRenderer.renderProject(projectId);
        });
    });

    setupSidebarButtons();
    initDialogEvents();
}
