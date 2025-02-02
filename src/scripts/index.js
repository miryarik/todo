import "../styles/modern-reset.css";
import "../styles/styles.css";
import { displayAllProjects } from "./contentRenderer.js";
import { renderSidebar } from "./sidebarRenderer.js";
import { createNewProject } from "./projectManager.js";

document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
    displayAllProjects();
});
