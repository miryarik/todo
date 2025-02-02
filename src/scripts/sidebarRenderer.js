import { displayAllProjects } from "./contentRenderer.js";
import { getAllProjectNames, createNewProject } from "./projectManager.js";

export function renderSidebar() {
    const sidebar = document.querySelector("sidebar");
    sidebar.innerHTML = "";
    
    
    // render all projects nav item 
    const allProjectsNav = createNavItem("all-projects-nav", "All projects", "");
    sidebar.appendChild(allProjectsNav);
    allProjectsNav.onclick = displayAllProjects;

    // create nav item for creating new project'
    const createNewProjectNav = createNavItem("create-new-project", "New project", "");
    sidebar.appendChild(createNewProjectNav);
    createNewProjectNav.onclick = () => {
        document.querySelector("dialog#new-project-dialog").showModal();
    };

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

    // sidebar refreshes on certain events:
    // new project is made
    document.addEventListener("NewProjectMade", () => {
        renderSidebar();
    });

}


function createNavItem(id, label, iconSrc) {
    // create nav item using
    // parameters : id, label, icon / img src

    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");
    navItem.setAttribute("id", id);
    
    const navItemIcon = document.createElement("img");
    navItemIcon.src = iconSrc;
    navItem.appendChild(navItemIcon);
    
    const navItemLabel = document.createElement("span");
    navItemLabel.innerText = label;
    navItem.appendChild(navItemLabel);

    return navItem;
}