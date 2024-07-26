import { FriendList } from "../components/FriendsList.js";
import { GameHistory } from "../components/GameHistory.js";

export function showCircle(container, cx, cy, radius, callback) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.style.position = 'absolute';
    div.style.backgroundColor = 'green';
    div.style.borderRadius = '50%';
    div.style.transition = 'width 0.5s ease, height 0.5s ease';

    container.append(div);

    setTimeout(() => {
        div.style.width = radius * 3 + 'px';
        div.style.height = radius * 3 + 'px';

        div.addEventListener('transitionend', function handler() {
            div.removeEventListener('transitionend', handler);
            callback(div);
        });
    }, 0);
}

export function setupFriendListAnimation(divRoot) {
    const friendlistLink = document.querySelector('.list-stat .nav-link');
    if (friendlistLink) {
        friendlistLink.addEventListener('click', (event) => {
            event.preventDefault();
            let section = document.createElement('div');
            section.id = 'section';
            divRoot.append(section);

            // Get the position of the friendlist link
            const rect = friendlistLink.getBoundingClientRect();
            section.style.position = 'absolute';
            section.style.left = `${rect.left}px`;
            section.style.top = `${rect.top}px`;

            FriendList();

            // After the Friend List is loaded, update the position and animation
            const friendlistElement = section.querySelector('.main-containerf');
            setTimeout(() => {
                section.style.position = 'relative';
                section.style.left = '0';
                section.style.top = '0';
                friendlistElement.classList.remove('fl-hidden');
                friendlistElement.classList.add('fl-visible');
            }, 10); // Small delay to ensure the CSS transition applies
        });
    } else {
        console.error('Friends list link not found');
    }
}

export function setupGameHistoryAnimation(divRoot) {
    const gameHistoryLink = document.querySelector('.game-history .nav-link');
    if (gameHistoryLink) {
        gameHistoryLink.addEventListener('click', (event) => {
            event.preventDefault();
            let section = document.createElement('div');
            section.id = 'section';
            divRoot.append(section);

            // Get the position of the game history link
            const rect = gameHistoryLink.getBoundingClientRect();
            section.style.position = 'absolute';
            section.style.left = `${rect.left}px`;
            section.style.top = `${rect.top}px`;

            GameHistory();

            // After the Game History is loaded, update the position and animation
            const gameHistoryElement = section.querySelector('.main-container2');
            setTimeout(() => {
                section.style.position = 'relative';
                section.style.left = '0';
                section.style.top = '0';
                gameHistoryElement.classList.remove('fl-hidden');
                gameHistoryElement.classList.add('fl-visible');
            }, 10); // Small delay to ensure the CSS transition applies
        });
    } else {
        console.error('Game History link not found');
    }
}

export function setupCamembertAnimation(dashboardContainer) {
    const camembertStat = document.querySelector('.camembert-stat');
    if (camembertStat) {
        const { left, top } = camembertStat.getBoundingClientRect();
        const radius = 100;

        const adjustedLeft = left - dashboardContainer.getBoundingClientRect().left;
        const adjustedTop = top - dashboardContainer.getBoundingClientRect().top;

        showCircle(dashboardContainer, adjustedLeft, adjustedTop, radius, () => {
            console.log('Circle animation complete');
        });
    } else {
        console.error('camembert-stat element not found');
    }
}

export const animateNumbers = (element, target) => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 10);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            clearInterval(timer);
            start = target;
        }
        element.textContent = Math.floor(start);
    }, 10);
};
