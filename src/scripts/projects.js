// MODULE
// handles all CRUD requests and operations
// on the projects in localStorage.PROJECTS
// using the PROJECTS array as runtime storage

import { getNewId } from "./utils.js";
import SAMPLE_PROJECTS from "./data/projects.json";

let PROJECTS = [];
const STORAGE_KEY = "PROJECTS";

function Project(name, description, id) {
    // project object factory

    this.name = name;
    this.description = description;
    this.id = id ? id : getNewId();
}

function resetStorage() {
    // reset projects in localStorage to samples
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PROJECTS));
}

function getProjectsFromStorage() {
    // return projects stored in localStorage
    const storedProjects = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return storedProjects;
}

function loadProjectsFromStorage() {
    // make project object for each project stored in localStorage
    // put them in PROJECTS

    let storedProjects = getProjectsFromStorage();

    if (!storedProjects) {
        // if storage is empty reset to samples

        resetStorage();
        storedProjects = getProjectsFromStorage();
    }

    const projectObjects = storedProjects.map((project) => {
        // make new object
        const projectObject = new Project(
            project.name,
            project.description,
            project.id
        );
        return projectObject;
    });

    PROJECTS = projectObjects;
}

function saveProjectsToStorage() {
    // set the localStorage.PROJECTS key
    // as per PROJECTS

    // make a new array of projects
    // using project objects from PROJECTS
    // and put it in localStorage

    const allProjects = PROJECTS.map((project) => {
        return {
            name: project.name,
            description: project.description,
            id: project.id,
        };
    });

    // update localStorage with new storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
}

function getAllProjects() {
    // return an array of all projects in TODOLIST
    return PROJECTS;
}

function getProjectById(id) {
    // get project using specified id

    const projects = getAllProjects();
    return projects.find((project) => project.id == id);
}

function createNewProject(name, description) {
    // add a project to PROJECTS array
    const project = new Project(name, description);
    PROJECTS.push(project);
}

function deleteProject(projectId) {
    // remove project with target id from PROJECTS

    // find the index of project with target id
    const idx = PROJECTS.findIndex((project) => project.id == projectId);

    // remove the element at this index
    PROJECTS.splice(idx, 1);
}

export const projectHandler = {
    loadProjectsFromStorage,
    saveProjectsToStorage,
    getAllProjects,
    getProjectById,
    createNewProject,
    deleteProject,
};
