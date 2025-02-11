import {projectApi} from "./projects";
import {tasksApi} from "./tasks";

export function renderTasks() {
    let tasks = tasksApi.get();
    const ulTask = document.querySelector("#task-list ul");
    ulTask.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('id', task.id);
        li.innerText = task.name;

        const btn = document.createElement('button');
        btn.innerText = "delete";

        btn.addEventListener("click", () => {
            tasksApi.deleteTask(li.getAttribute('id'));
            renderTasks();
        });

        li.appendChild(btn);

        ulTask.appendChild(li);
    });
}

export function renderProjects() {
    let projects = projectApi.get();

    const ulProj = document.querySelector("#project-list ul");
    ulProj.innerHTML = "";

    projects.forEach(project => {
        const li = document.createElement('li');
        li.setAttribute('id', project.id);
        li.innerText = project.name;

        const btn = document.createElement('button');
        btn.innerText = "delete";

        btn.addEventListener("click", () => {
            projectApi.delete(li.getAttribute('id'));
            renderProjects();
        });

        li.appendChild(btn);
        ulProj.appendChild(li);

    });
}

