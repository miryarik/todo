export function getNewId() {
    // generate a new date and time based unique id (unique to a millisecond)
    // so basically a timestamp T_T
    // format : year-month-date-time(in ms)

    const date = new Date();
    const id = `${date.getFullYear()}${String(date.getMonth() + 1)
        .padStart(2, '0')}${String(date.getDate())
        .padStart(2, '0')}${date.getTime()}`;
    
    return id;
}


export function getCards(projects) {

    const cards = []

    projects.forEach(project => {

        const card = document.createElement("card");
        card.setAttribute("id", project.id);

        const name = document.createElement("h3");
        name.innerText = project.name;

        const description = document.createElement("p");
        description.innerText = project.description;

        card.appendChild(name);
        card.appendChild(description);
        cards.push(card);
        
    });
    
    return cards;
}