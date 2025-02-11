import {Project, projectApi} from "./lib/projects";
import {Task, tasksApi} from "./lib/tasks";
import {renderProjects, renderTasks} from "./lib/render";

document.addEventListener("DOMContentLoaded", () => {
    setupProjectButtons();
    setupTaskButtons();
    projectApi.load();
    tasksApi.load();
    renderView();
});

window.addEventListener('beforeunload', () => {
    projectApi.save();
    tasksApi.save();
});

function setupProjectButtons() {
    let resetProjectButton = document.querySelector("#reset-project-btn")
    resetProjectButton.onclick = () => {
        projectApi.reset();
        renderView();
    };

    let newProjectButton = document.querySelector("#new-project-btn")
    newProjectButton.onclick = () => {
        createNewProject();
        renderView();
    }
}

function setupTaskButtons() {
    let resetTaskButton = document.querySelector("#reset-task-btn")
    resetTaskButton.onclick = () => {
        tasksApi.reset();
        renderView();
    }

    let newTaskButton = document.querySelector("#new-task-btn");
    newTaskButton.onclick = () => {
        createNewTask();
        renderView();
    }
}

function createNewProject() {
    const name = document.querySelector('#project-name').value;
    const description = document.querySelector('#project-description').value;
    projectApi.add(new Project(name, description));
}

function createNewTask() {
    const name = document.querySelector('#task-name').value;
    const description = document.querySelector('#task-description').value;
    const task = new Task(name, description, null, null)
    tasksApi.add(task)
}

function renderView() {
    renderProjects();
    renderTasks();
}
