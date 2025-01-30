import logoSrc from "../images/logo.png";
import { getAllProjectNames } from "./projectManager.js";

export function renderSidebar() {
    const sidebar = document.querySelector("sidebar");
    
    // render all projects nav item 
    const allProjectsNav = document.createElement("div");
    allProjectsNav.classList.add("nav-item");
    sidebar.appendChild(allProjectsNav);
    
    const allProjectsNavIcon = document.createElement("img");
    allProjectsNavIcon.src = "";
    allProjectsNav.appendChild(allProjectsNavIcon);
    
    const allProjectsNavLabel = document.createElement("span");
    allProjectsNavLabel.innerText = "All Projects";
    allProjectsNav.appendChild(allProjectsNavLabel);


    // make all projects list
    const projectNamesList = getAllProjectNames();
    const projectsDiv = document.createElement("div");
    projectsDiv.classList.add("nav-list");
    sidebar.appendChild(projectsDiv);

    projectNamesList.forEach(projectName => {
        
        const project = document.createElement("div");
        
        const label = document.createElement("span");
        label.innerText = projectName;

        projectsDiv.appendChild(project);
        project.appendChild(label);
    });

}