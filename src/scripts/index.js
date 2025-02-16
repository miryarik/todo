import { projectHandler } from "./projects.js";
import { taskHandler } from "./tasks.js";
import { sidebarRenderer } from "./sidebarRenderer.js";
import { contentRenderer } from "./contentRenderer.js";
import { initSidebarEvents } from "./events.js";
import "../styles/styles.css";

document.addEventListener("DOMContentLoaded", () => {
    // what whatever we have
    projectHandler.loadProjectsFromStorage();
    taskHandler.loadTasksFromStorage();

    sidebarRenderer.renderTaskList();
    sidebarRenderer.renderProjectList();
    initSidebarEvents();
    
    contentRenderer.renderAllProjects();

});

window.addEventListener("beforeunload", () => {
    // Save current state back to localStorage
    projectHandler.saveProjectsToStorage();
    taskHandler.saveTasksToStorage();
});
