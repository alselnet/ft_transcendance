import './style.css';
import { App } from "./app/App.js";
import { applySavedBackground } from './app/functions/SettingsFunctions.js';

window.isInternalNavigation = false;

document.addEventListener("DOMContentLoaded", function() {

    const savedBackgroundClass = localStorage.getItem('backgroundClass');

    if (savedBackgroundClass)
        applySavedBackground();
    else {
        document.body.classList.add('bg-nagoya');
    }
    window.isInternalNavigation = false;
    App();
});
window.addEventListener("hashchange", App);
