import "../styles/modern-reset.css";
import "../styles/styles.css";
import { displayAllProjects } from "./contentRenderer.js";
import { renderSidebar } from "./sidebarRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
    displayAllProjects();
    renderSidebar();
});
