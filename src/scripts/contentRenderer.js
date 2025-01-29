import { getAllProjects } from "./projectManager.js";


export function displayAllProjects() {
    const allProjects = getAllProjects();

    const content = document.querySelector("content");

    allProjects.forEach(project => {
        const projectCard = document.createElement('card');

        projectCard.innerText = project.name;
        
        content.appendChild(projectCard);
    });
}