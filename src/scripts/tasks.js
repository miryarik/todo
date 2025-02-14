// MODULE
// handles all CRUD operations and requests for tasks
// in localStorage.todolist.tasks

import { getNewId } from "./utils.js";
import SAMPLE_TASKS from "./data/tasks.json";

let TASKS = [];
const STORAGE_KEY = "TASKS";


function Task(name, description, dueDate, priority, projectId, id) {
    // task object factory

    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.id = id ? id : getNewId();
}

function resetStorage() {
    // reset tasks in localStorage to sample tasks
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TASKS));

}

function getTasksFromStorage() {
    // return tasks stored in localStorage
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return storedTasks;
}

function loadTasksFromStorage() {
    // make task object for each task stored in localStorage
    // put them in TODOLIST.tasks

    let storedTasks = getTasksFromStorage();

    if (!storedTasks) {
        // if storage is empty reset to samples
        
        resetStorage();
        storedTasks = getTasksFromStorage();
    }


    const taskObjects = storedTasks.map((task) => {
        // map each stored task to object task
        const taskObject = new Task(
            task.name,
            task.description,
            task.dueDate,
            task.priority,
            task.id,
            task.projectId
        );
        return taskObject;
    });

    TASKS = taskObjects;
}

function saveTasksToStorage() {
    // set the localStorage.TASKS
    // as per TASKS

    // make a new array of tasks
    // using task objects from TASKS
    // and put in into localStorage

    const allTasks = TASKS.map((task) => {
        return {
            name: task.name,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            id: task.id,
            projectId: task.projectId,
        };
    });

    // update the localStorage with new storage;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
}

function getAllTasks() {
    // return an array of all tasks in the TODOLIST
    return TASKS;
}

function getTaskById(taskId) {
    // get task by specified id

    const tasks = getAllTasks();
    return tasks.find((task) => task.id == taskId);
}

function createNewTask(name, description, dueDate, priority, projectId) {
    // add task to TASKS array
    const task = new Task(name, description, dueDate, priority, projectId);
    TASKS.push(task);
}

function deleteTask(taskId) {
    // remove the task with taskId from TODOLIST.tasks

    // find its index
    const idx = TASKS.findIndex((task) => task.id == taskId);

    // remove the task
    TASKS.splice(idx, 1);
}

export const taskHandler = {
    loadTasksFromStorage,
    saveTasksToStorage,
    getAllTasks,
    getTaskById,
    createNewTask,
    deleteTask,
};
