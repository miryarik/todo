import "../styles/modern-reset.css";
import "../styles/styles.css";
import { displayAllProjects } from "./contentRenderer.js";
import { renderSidebar } from "./sidebarRenderer.js";
import { createNewProject } from "./projectManager.js";

document.addEventListener("DOMContentLoaded", () => {


    const modal = document.querySelector("dialog#new-project-dialog");
    modal.querySelector("button#submit").addEventListener("click", (event) => {
        
        event.preventDefault();

        const name = modal.querySelector("form input#name").value;
        const desc = modal.querySelector("form textarea#description").value;
        const startDate = modal.querySelector("form input#startDate").value;
        const endDate = modal.querySelector("form input#endDate").value;

        if (name) {
            createNewProject(name, desc, startDate, endDate, []);
            let newProjectEvent = new CustomEvent("NewProjectMade", {bubbles: true});
            // let document know new project was made
            modal.dispatchEvent(newProjectEvent);
            modal.close();

        }

    });

    renderSidebar();
    displayAllProjects();
});
