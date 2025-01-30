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