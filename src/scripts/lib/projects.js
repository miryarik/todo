import SAMPLE_PROJECTS from "../data/projects.json";
import {getNewId} from "./utils";

let PROJECTS = [];
const PROJECTS_KEY = "PROJECTS_KEY"

export function Project(name, description, id) {
    this.name = name;
    this.description = description;
    this.id = id ? id : getNewId();
}

function getProjects() {
    return PROJECTS;
}

function loadProjects() {
    PROJECTS = JSON.parse(localStorage.getItem(PROJECTS_KEY));
}

function saveProjects() {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(PROJECTS));
}

function addNewProject(project) {
    PROJECTS.push(project);
}

function deleteProject(projectId) {
    const idx = PROJECTS.findIndex(project => project.id == projectId);
    PROJECTS.splice(idx, 1);
}

function reset() {
    PROJECTS = [...SAMPLE_PROJECTS];
}

export const projectApi = {
    get: getProjects,
    load: loadProjects,
    save: saveProjects,
    delete: deleteProject,
    add: addNewProject,
    reset: reset
}