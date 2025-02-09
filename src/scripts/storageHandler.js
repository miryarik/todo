import sampleStorage from "./storage.json";


// key for reference into localStorage
const STORAGE_KEY = "todolist";

// todolist object T_T this is so weird to do
let TODOLIST = {
    "project": [],
    "tasks": []
};


function resetStorage() {
    // reset localStorage to samples
    console.log("resetting storage to samples");
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleStorage));
}


function getCurrentStorage() {
    // return the current storage from localStorage
    // or the empty array if localStorage does not have the key

    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}


export function loadCurrentStorage() {

    // if we have anything, good, dont touch it
    // if not, reset the storage
    let currentStorage = getCurrentStorage();
    
    if (!currentStorage){
        resetStorage();
    }
}


export const projectHandler = (() => {
    // MODULE
    // handles all CRUD requests and operations
    // on the projects in localStorage key


    // an id counter as a hack
    let nextId = 2;


    function Project(name, description, ) {
        // project object factory

        this.name = name;
        this.description = description;
        this.id = getNewId();

        function getNewId() {
            // const allProjects = getAllProjects();
            // return allProjects.length;

            nextId++;
            return nextId;
        }
    }


    function loadProjectsFromStorage() {
        // make project object for each project stored in localStorage
        // put them in TODOLIST.projects

        const storedProjects = getCurrentStorage().projects;

        const projectObjects = storedProjects.map(project => {
            // make new object
            const projectObject = new Project(project.name, project.description);
            return projectObject;
        });

        TODOLIST.projects = projectObjects;
    }


    function saveProjectsToStorage() {
        // set the localStorage.todolist.projects key
        // as per TODOLIST.projects

        // make an updated storage object
        // using projects from TODOLIST.projects
        const storage = getCurrentStorage();
        storage.projects = TODOLIST.projects.map(project => {

            return {
                "name" : project.name,
                "description" : project.description,
                "id" : project.id
            }

        });

        // update localStorage with new storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    }
    

    function getAllProjects() {
        // return an array of all projects in TODOLIST

        return TODOLIST.projects;
    }


    function getProjectById(id) {
        // get project from current localStorage using id

        const projects = getAllProjects();
        return projects.find(project => project.id == id);
    }


    function createNewProject(name, description) {
        // add a new project to storage on localStorage

        const project = new Project(name, description);

        // add a project to projects array
        TODOLIST.projects.push(project);
    }



    function deleteProject(targetId) {
        // remove project with target id from TODOLIST.projects

        // find the index of project with target id
        const idx = TODOLIST.projects.findIndex(project => project.id == targetId);

        // remove the element at this index
        TODOLIST.projects.splice(idx, 1);
    }



    return {
        createNewProject,
        getAllProjects,
        getProjectById,
        deleteProject,
        loadProjectsFromStorage,
        saveProjectsToStorage
    }

})();


export const taskHandler = (() => {
    // MODULE
    // handles all CRUD operations and requests for tasks
    // in localStorage.todolist.tasks


})();