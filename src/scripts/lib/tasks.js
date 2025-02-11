import SAMPLE_TASKS from "../data/tasks.json";
import {getNewId} from "./utils";

const TASKS_KEY = "TASKS_KEY"
let TASKS = [];

function loadTasks() {
    TASKS = JSON.parse(localStorage.getItem(TASKS_KEY));
}

function reset() {
    TASKS = [...SAMPLE_TASKS]
}

function getTasks() {
    return TASKS;
}

function deleteTask(taskId) {
    const idx = TASKS.findIndex(task => task.id == taskId);
    TASKS.splice(idx, 1);
}

function saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(TASKS));
}

function addNewTask(task) {
    TASKS.push(task);
}

export function Task(name, description, dueDate, priority, projectId, id) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.id = id ? id : getNewId();
}

export const tasksApi = {
    load: loadTasks,
    get: getTasks,
    add: addNewTask,
    deleteTask: deleteTask,
    save: saveTasks,
    reset: reset
}