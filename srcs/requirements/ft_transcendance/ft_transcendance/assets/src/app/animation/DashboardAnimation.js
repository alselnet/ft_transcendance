import { FriendList } from "../components/FriendsList.js";
import { GameHistory } from "../components/GameHistory.js";

export function setupFriendListAnimation(dashboardContainer) {
    const listButton = dashboardContainer.querySelector('#list-stat');
    if (!listButton) {
        console.error('List button not found');
        return;
    }

    listButton.addEventListener('click', () => {
        let container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = 0;
        container.style.top = 0;
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = 1000;
        document.body.append(container);

        let rect = listButton.getBoundingClientRect();
        let cx = rect.left + rect.width / 2;
        let cy = rect.top + rect.height / 2;
        let radius = Math.max(window.innerWidth, window.innerHeight);

        showCircle(container, cx, cy, radius, (div) => {
            let friendsList = FriendList();
            friendsList.style.opacity = 0;
            friendsList.style.transition = 'opacity 0.5s';
            div.append(friendsList);

            setTimeout(() => {
                friendsList.style.opacity = 1;
            }, 0);

            friendsList.querySelector('.close-button').addEventListener('click', () => {
                friendsList.style.opacity = 0;
                friendsList.addEventListener('transitionend', function onTransitionEnd() {
                    friendsList.removeEventListener('transitionend', onTransitionEnd);
                    hideCircle(div, () => container.remove());
                });
            });
        });
    });
}

export function setupGameHistoryAnimation(dashboardContainer) {
    const historyButton = dashboardContainer.querySelector('#history-stat');
    if (!historyButton) {
        console.error('History button not found');
        return;
    }

    historyButton.addEventListener('click', () => {
        let container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = 0;
        container.style.top = 0;
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.zIndex = 1000;
        document.body.append(container);

        let rect = historyButton.getBoundingClientRect();
        let cx = rect.left + rect.width / 2;
        let cy = rect.top + rect.height / 2;
        let radius = Math.max(window.innerWidth, window.innerHeight);

        showCircle(container, cx, cy, radius, (div) => {
            let gameHistory = GameHistory();
            gameHistory.style.opacity = 0;
            gameHistory.style.transition = 'opacity 0.5s';
            div.append(gameHistory);

            setTimeout(() => {
                gameHistory.style.opacity = 1;
            }, 0);

            gameHistory.querySelector('.close-button').addEventListener('click', () => {
                gameHistory.style.opacity = 0;
                gameHistory.addEventListener('transitionend', function onTransitionEnd() {
                    gameHistory.removeEventListener('transitionend', onTransitionEnd);
                    hideCircle(div, () => container.remove());
                });
            });
        });
    });
}

//animation qui fonctionne...enfin je crois
/*export function setupCamembertAnimation(dashboardContainer) {
    console.log('Setting up camembert animation');
    const camembertContainer = dashboardContainer.querySelector('.camembert-stat');
    if (!camembertContainer) {
        console.error('Camembert container not found');
        return;
    }

    console.log('Camembert container found', camembertContainer);

    // Clear previous circles if any
    camembertContainer.innerHTML = '';

    // Display a circle in the camembert container
    const containerRect = camembertContainer.getBoundingClientRect();
    const cx = containerRect.width / 2;
    const cy = containerRect.height / 2;
    const radius = containerRect.width / 2;

    showCircle(camembertContainer, cx, cy, radius, (div) => {
        console.log('Circle shown:', div);
        // Here you can add more code to handle the animation completion
    });
}*/

/*
export function showCircle(container, cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.style.borderRadius = '50%';
    div.style.position = 'absolute';
    div.style.backgroundColor = 'yellow';
    div.style.transition = 'width 0.5s ease, height 0.5s ease, left 0.5s ease, top 0.5s ease';

    container.appendChild(div);

    // Delay the animation to ensure the element is added to the DOM
    setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
        div.style.left = (cx - radius) + 'px';
        div.style.top = (cy - radius) + 'px';
        callback(div);
    }, 10);
}

//last one
export function setupCamembertAnimation(dashboardContainer, percentage) {
    console.log('Setting up camembert animation');
    const camembertContainer = dashboardContainer.querySelector('.camembert-stat');
    if (!camembertContainer) {
        console.error('Camembert container not found');
        return;
    }

    console.log('Camembert container found', camembertContainer);

    // Clear previous circles if any
    camembertContainer.innerHTML = '';

    // Display a sector graph in the camembert container    
    const containerRect = camembertContainer.getBoundingClientRect();
    const size = containerRect.width;
    const radius = size / 2;

    showSectorGraph(camembertContainer, size, percentage);
}

function showSectorGraph(container, size, percentage) {
    const radius = size / 2;
    const center = radius;
    const endAngle = (percentage / 100) * 360;
    const radians = (endAngle * Math.PI) / 180;
    const largeArc = endAngle > 180 ? 1 : 0;

    const x = center + radius * Math.cos(radians - Math.PI / 2);
    const y = center + radius * Math.sin(radians - Math.PI / 2);

    const sectorPath = `
        M ${center},${center}
        L ${center},${center - radius}
        A ${radius},${radius} 0 ${largeArc} 1 ${x},${y}
        Z
    `;

    const svg = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${center}" cy="${center}" r="${radius}" fill="lightgray"/>
            <path d="${sectorPath}" fill="pink"/>
        </svg>
    `;

    container.innerHTML = svg;
}
*/
export function setupCamembertAnimation(dashboardContainer, percentage) {
    console.log('Setting up camembert animation');
    const camembertContainer = dashboardContainer.querySelector('.camembert-stat');
    if (!camembertContainer) {
        console.error('Camembert container not found');
        return;
    }

    console.log('Camembert container found', camembertContainer);

    // Clear previous circles if any
    camembertContainer.innerHTML = '';

    // Display a sector graph in the camembert container
    const containerRect = camembertContainer.getBoundingClientRect();
    const size = containerRect.width;
    const radius = size / 2;

    showCircle(camembertContainer, radius, radius, radius, (div) => {
        // Ensure the circle is fully expanded before drawing the sector
        setTimeout(() => {
            showSectorGraph(div, size, percentage);
        }, 500);
    });
}

export function showCircle(container, cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.style.borderRadius = '50%';
    div.style.position = 'absolute';
    div.style.backgroundColor = 'green';
    div.style.transition = 'width 0.5s ease, height 0.5s ease, left 0.5s ease, top 0.5s ease';

    container.appendChild(div);
    console.log('Circle div added to DOM:', div);

    // Delay the animation to ensure the element is added to the DOM
    setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
        div.style.left = (cx - radius) + 'px';
        div.style.top = (cy - radius) + 'px';
        console.log('Circle animation started');
        callback(div);
    }, 10);
}

function showSectorGraph(container, size, percentage) {
    const radius = size / 2;
    const center = radius;
    const endAngle = (percentage / 100) * 360;
    const radians = (endAngle * Math.PI) / 180;
    const largeArc = endAngle > 180 ? 1 : 0;

    const x = center + radius * Math.cos(radians - Math.PI / 2);
    const y = center + radius * Math.sin(radians - Math.PI / 2);

    const sectorPath = `
        M ${center},${center}
        L ${center},${center - radius}
        A ${radius},${radius} 0 ${largeArc} 1 ${x},${y}
        Z
    `;

    const svg = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${center}" cy="${center}" r="${radius}" fill="green"/>
            <path d="${sectorPath}" fill="red" style="transform-origin: ${center}px ${center}px; transform: scale(0); transition: transform 0.5s ease;"/>
        </svg>
    `;

    container.innerHTML = svg;

    // Trigger the sector animation
    setTimeout(() => {
        const path = container.querySelector('path');
        path.style.transform = 'scale(1)';
        console.log('Sector animation started');
    }, 10);
}
