import { projectHandler } from "./projects.js";
import { contentRenderer } from "./contentRenderer.js";
import { sidebarRenderer } from "./sidebarRenderer.js";
import { renderEditProjectDialog } from "./events.js";
import editSrc from "../images/edit.svg";
import deleteSrc from "../images/delete.svg";

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

export function compareTasksByDate(taskOne, taskTwo) {
    return taskOne.dueDate.localeCompare(taskTwo.dueDate);
}

export function formatDate(yyyymmdd) {
    // transform date from yyyymmdd to ddmmyyyy
    const [year, month, day] = yyyymmdd.split("-");
    const ddmmyyyy = `${day}-${month}-${year}`;
    return ddmmyyyy;
}

export function getSampleDate(option) {
    const date = new Date();
    const day = (option == "today") ? date.getDate() : (option == "tomorrow" ? date.getDate() + 1 : date.getDate() + 5);
    // getMonth uses 0 based index
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // return with padding adjustments
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
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

        if ((dd == tomorrow)) {
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
        description.setAttribute("class", "description");
        description.innerText = project.description;

        const options = document.createElement("div");
        options.setAttribute("class", "options");
        
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete-btn");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteSrc;
        deleteButton.appendChild(deleteIcon);
        options.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.setAttribute("id", "edit-btn");
        const editIcon = document.createElement("img");
        editIcon.src = editSrc;
        editButton.appendChild(editIcon);
        options.appendChild(editButton);

        deleteButton.addEventListener("click", () => {
            projectHandler.deleteProject(project.id);
            sidebarRenderer.renderTaskList();
            sidebarRenderer.renderProjectList();
            contentRenderer.renderAllProjects();
        });

        editButton.addEventListener("click", () => {
            renderEditProjectDialog(project.id);
        });

        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(options);

        card.addEventListener("click", () => {
            contentRenderer.renderProject(project.id);
        });

        cards.push(card);
    });

    return cards;
}
