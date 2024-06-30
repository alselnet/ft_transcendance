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

