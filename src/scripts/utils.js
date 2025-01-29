export function navToggle(tab) {
    const navBtns = document.querySelectorAll("nav > button");

    navBtns.forEach(btn => {
        btn.classList.remove("active");
    });

    tab.classList.add("active");
}

export function appendChildren(node, children) {
    // takes a DOM node (parent) and a list of desired children
    // appends the children to the parent node

    children.forEach(element => {
        node.appendChild(element);
    });
}

export function createBtnsFromIcons(sources) {
    // takes a list of img sources
    // return a list of DOM imgs with corresponding sources
    // wrapped in div.icon
    
    let imgs = [];

    sources.forEach(source => {
        const button = document.createElement("button");
        button.classList.add("icon");

        const img = document.createElement("img");
        img.src = source;

        button.appendChild(img);
        imgs.push(button);
    });

    return imgs;
}
