import sampleStorage from "./storage.json";


export const storageHandler = (() => {

    // module that handles CRUD operations on localStorage
    const STORAGE_KEY = "todolist";
    let storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


    function resetStorage() {
        // reset to sample storage on localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleStorage));
    }


    function loadStorage() {
        // if we have anything good, keep it
        // if not reset the storage

        const currentStorage = getCurrentStorage();
        
        if (!currentStorage){
            console.log("resetting");
            resetStorage();
        }
    }


    function getCurrentStorage() {
        // return the current storage from localStorage
        // or the empty array if localStorage does not have the key

        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    

    function getProject(id) {
        // get project from current localStorage using id

        storage = getCurrentStorage();
        return storage.find(project => project.id == id);
    }


    function addProject(project) {
        // add a new project to storage on localStorage

        storage = getCurrentStorage();
        storage.push(project);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

    }


    return {
        loadStorage,
        getProject,
        addProject
    }

})();