import { getAllProjects } from "./projectManager.js";
import { appendChildren } from "./utils.js";
import { createBtnsFromIcons } from "./utils.js";
import deleteSrc from "../images/delete.svg";
import editSrc from "../images/edit.svg";
import checkSrc from "../images/check.svg";



function makeProjectCard(project) {
    // takes a project object and
    // return a card element with
    // name, decription and options

    // project card element
    const projectCard = document.createElement('card');

    // add name
    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = project.name;

    // add description
    const description = document.createElement('div');
    description.classList.add('description');
    description.innerText = project.description;

    // add dates
    const dates = document.createElement('div');
    dates.classList.add('dates');
    dates.innerText = `${project.startDate} - ${project.endDate}`;

    // add options div
    const options = document.createElement('div');
    options.classList.add('options');
    
    // add option buttons
    const optionButtons = createBtnsFromIcons([deleteSrc, editSrc, checkSrc]);
    optionButtons[0].classList.add('delete');
    optionButtons[1].classList.add('edit');
    optionButtons[2].classList.add('check');
    appendChildren(options, optionButtons);
    
    appendChildren(projectCard, [name, description, dates, options]);

    return projectCard;
}

export function displayAllProjects() {
    // displays all projects as cards
    // in the content area

    const allProjects = getAllProjects();

    // remove contents
    const content = document.querySelector("content");
    content.innerHTML = "";

    // add header and container
    const heading = document.createElement('h1');
    heading.innerText = "All Projects";

    const container = document.createElement("div");
    container.classList.add("container");
    // add all-projects class to container for semantics
    container.classList.add("all-projects");

    appendChildren(content, [heading, container]);

    // make project cards
    allProjects.forEach(project => {
        const projectCard = makeProjectCard(project);
        container.appendChild(projectCard);
    });

    // content should refresh on events:
    // when new project is made
    document.addEventListener("NewProjectMade", () => {
        displayAllProjects();
    });
}