import { projectHandler } from "./projects.js";
import { taskHandler } from "./tasks.js";
import { sidebarRenderer } from "./sidebarRenderer.js";
import { contentRenderer } from "./contentRenderer.js";
import { initSidebarEvents } from "./events.js";
import "../styles/styles.css";

window.tasks = taskHandler;
window.projects = projectHandler;

document.addEventListener("DOMContentLoaded", () => {
    // load storage, render UI and setup listeners
    projectHandler.loadProjectsFromStorage();
    taskHandler.loadTasksFromStorage();

    sidebarRenderer.renderTaskList();
    sidebarRenderer.renderProjectList();
    initSidebarEvents();

    // upcoming opens up by default
    contentRenderer.renderUpcoming();
});

window.addEventListener("beforeunload", () => {
    // Save current state to storage
    projectHandler.saveProjectsToStorage();
    taskHandler.saveTasksToStorage();
});
