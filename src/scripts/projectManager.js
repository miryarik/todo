import allProjects from "./storage.json";


export function getAllProjects() {
    return allProjects;
}

export function getAllProjectNames() {
    let names = [];

    allProjects.forEach(project => {
        names.push(project.name);
    });

    return names;
}

export function createNewProject(name, description, startDate, endDate, tasks) {
    // create operation
    // adds a new project to the storage
    // as per specifications 

    if (name) {
        const newProject = {
            "name": name,
            "description": description,
            "startDate": startDate,
            "endDate": endDate,
            "tasks": tasks,
        };

        allProjects.push(newProject);
        
    }
}