import "../styles/modern-reset.css";
import "../styles/styles.css";
import { displayAllProjects } from "./contentRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
    displayAllProjects();
});
