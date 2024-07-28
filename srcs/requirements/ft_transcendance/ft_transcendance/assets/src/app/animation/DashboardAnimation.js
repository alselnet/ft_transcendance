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

export function setupCamembertAnimation(dashboardContainer) {
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
}

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
