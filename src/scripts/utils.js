import { projectHandler } from "./projects.js";
import { contentRenderer } from "./contentRenderer.js";
import { sidebarRenderer } from "./sidebarRenderer.js";
import { taskHandler } from "./tasks.js";

export function getNewId() {
    // generate a new date and time based unique id (unique to a millisecond)
    // so basically a timestamp T_T
    // format : year-month-date-time(in ms)

    const date = new Date();
    const id = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}${String(date.getDate()).padStart(2, "0")}${date.getTime()}`;

    return id;
}

export function getBullets(tasks) {
    const bullets = [];

    tasks.forEach((task) => {
        const bullet = document.createElement("li");
        bullet.setAttribute("id", task.id);
        bullet.setAttribute("class", "task-bullet");

        const name = document.createElement("h3");
        name.innerText = task.name;

        const description = document.createElement("p");
        description.innerText = task.description;

        const optionsDiv = document.createElement("div");
        optionsDiv.setAttribute("class", "options");
        const deleteButton = document.createElement("button");
        optionsDiv.appendChild(deleteButton);
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", () => {
            taskHandler.deleteTask(task.id);
            sidebarRenderer.renderTaskList();
            contentRenderer.renderAllTasks();
        });

        const infoDiv = document.createElement("div");
        infoDiv.setAttribute("class", "info");
        const date = document.createElement("p");
        const priority = document.createElement("p");

        const dateText = dayFromDate(task.dueDate)
        date.innerText = dateText;
        switch (dateText) {
            case "Today":
                bullet.classList.add("today");
                break;
        
            case "Tomorrow":
                bullet.classList.add("tomorrow");
                break;
        }

        priority.innerText = task.priority;
        infoDiv.appendChild(date);
        infoDiv.appendChild(priority);

        bullet.appendChild(name);
        bullet.appendChild(description);
        bullet.appendChild(optionsDiv);
        bullet.appendChild(infoDiv);

        bullets.push(bullet);
    });

    return bullets;
}

export function formatDate(yyyymmdd) {
    // transform date from yyyymmdd to ddmmyyyy
    const [year, month, day] = yyyymmdd.split("-");
    const ddmmyyyy = `${day}-${month}-${year}`;
    return ddmmyyyy;
}

export function dayFromDate(ddmmyyyy) {
    // get today or tommorrow from date
    // caution : Date object uses 0-based numbering for getMonth()

    const date = new Date();
    const today = date.getDate();
    const tomorrow = today + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let [dd, mm, yyyy] = ddmmyyyy.split("-");
    dd = Number(dd);
    mm = Number(mm);
    yyyy = Number(yyyy);

    if (mm == month && yyyy == year) {
        if (dd == today) {
            return "Today";
        }

        if ((dd = tomorrow)) {
            return "Tomorrow";
        }
    }

    return ddmmyyyy;
}

export function getCards(projects) {
    const cards = [];

    projects.forEach((project) => {
        const card = document.createElement("card");
        card.setAttribute("id", project.id);

        const name = document.createElement("h3");
        name.innerText = project.name;

        const description = document.createElement("p");
        description.innerText = project.description;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", () => {
            projectHandler.deleteProject(project.id);
            sidebarRenderer.renderTaskList();
            sidebarRenderer.renderProjectList();
            contentRenderer.renderAllProjects();
        });

        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(deleteButton);

        card.addEventListener("click", () => {
            contentRenderer.renderProject(project.id);
        });

        cards.push(card);
    });

    return cards;
}
