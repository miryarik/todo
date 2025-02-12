import { projectHandler } from "./projects.js";
import { taskHandler } from "./tasks.js";
import { sidebarRenderer } from "./renderer.js";
import "../styles/styles.css";


document.addEventListener("DOMContentLoaded", () => {
    // what whatever we have
    projectHandler.loadProjectsFromStorage();
    taskHandler.loadTasksFromStorage();

    sidebarRenderer.renderTaskList();
    sidebarRenderer.renderProjectList();

});


window.addEventListener('beforeunload', () => {
    // Save current state back to localStorage
    // projectHandler.saveProjectsToStorage();
    // taskHandler.saveTasksToStorage();

});


