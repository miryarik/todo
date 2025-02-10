import sampleStorage from "./storage.json";


// key for reference into localStorage
const STORAGE_KEY = "todolist";

// todolist object T_T this is so weird to do
let TODOLIST = {
    "projects": [],
    "tasks": [],
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


function getNewId() {
    // generate a new date and time based unique id (unique to a millisecond)
    // so basically a timestamp T_T
    // format : year-month-date-time(in ms)

    const date = new Date();

    const id = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${date.getTime()}`;
    return id;
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


    function Project(name, description, id) {
        // project object factory

        this.name = name;
        this.description = description;
        this.id = id ? id : getNewId();

    }


    function loadProjectsFromStorage() {
        // make project object for each project stored in localStorage
        // put them in TODOLIST.projects

        const storedProjects = getCurrentStorage().projects;

        const projectObjects = storedProjects.map(project => {
            // make new object
            const projectObject = new Project(project.name, project.description, project.id);
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
        // get project using specified id

        const projects = getAllProjects();
        return projects.find(project => project.id == id);
    }


    function createNewProject(name, description) {
        // add a new project to storage on localStorage

        const project = new Project(name, description);

        // add a project to projects array
        TODOLIST.projects.push(project);
    }



    function deleteProject(projectId) {
        // remove project with target id from TODOLIST.projects

        // find the index of project with target id
        const idx = TODOLIST.projects.findIndex(project => project.id == projectId);

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

    function Task(name, description, dueDate, priority, projectId, id) {
        // task object factory

        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.id = id ? id : getNewId();

    }


    function loadTasksFromStorage() {
        // make task object for each task stored in localStorage
        // put them in TODOLIST.tasks

        const storedTasks = getCurrentStorage().tasks;

        const taskObjects = storedTasks.map(task => {
            // map each stored task to object task
            const taskObject = new Task(task.name, task.description, task.dueDate, task.priority, task.id, task.projectId);
            return taskObject;
        });

        TODOLIST.tasks = taskObjects;
    }


    function saveTasksToStorage() {
        // set the tasks from TODOLIST.tasks to
        // localStorage.todolist.tasks key

        // make an updated storage object
        // using tasks from TODOLIST.tasks
        const storage = getCurrentStorage();
        storage.tasks = TODOLIST.tasks.map(task => {

            return {
                "name": task.name,
                "description": task.description,
                "dueDate": task.dueDate,
                "priority": task.priority,
                "id": task.id,
                "projectId" : task.projectId
            }

        });

        // update the localStorage with new storage;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    }


    function  getAllTasks() {
        // return an array of all tasks in the TODOLIST

        return TODOLIST.tasks;
    }


    function getTaskById(taskId) {
        // get task by specified id

        const tasks = getAllTasks();
        return tasks.find(task => task.id == taskId);
    }


    function createNewTask(name, description, dueDate, priority, projectId) {
        // add a new task to storage on localStorage

        const task = new Task(name, description, dueDate, priority,projectId);

        // add task to TODOLIST.tasks
        TODOLIST.tasks.push(task);
    }


    function deleteTask(taskId) {
        // remove the task with taskId from TODOLIST.tasks

        // find its index
        const idx = TODOLIST.tasks.findIndex(task => task.id == taskId);

        // remove the task
        TODOLIST.tasks.splice(idx, 1);
    }


    return {
        loadTasksFromStorage,
        saveTasksToStorage,
        getAllTasks,
        getTaskById,
        createNewTask,
        deleteTask
    }

})();