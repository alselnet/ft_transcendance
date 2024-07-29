import './style.css';
import { App } from "./app/App.js";

window.isInternalNavigation = false;

// document.addEventListener("DOMContentLoaded", App);
document.addEventListener("DOMContentLoaded", function() {
    window.isInternalNavigation = false;
    App();
});
window.addEventListener("hashchange", App);