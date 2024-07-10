export function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
    }
}

export function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    };
}

export function animate({timing, draw, duration}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

export function animateBalls(section, whiteBall, orangeBall) {

    whiteBall.style.position = 'absolute';
    orangeBall.style.position = 'absolute';

    whiteBall.style.top = '0';
    orangeBall.style.top = '0';

    const toWhite = (section.clientHeight - whiteBall.clientHeight) / 2;
    const toOrange = (section.clientHeight - orangeBall.clientHeight) / 2;

    animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw(progress) {
            whiteBall.style.transform = `translateY(${toWhite * progress}px)`;
        }
    });

    setTimeout(() => {
        animate({
            duration: 2000,
            timing: makeEaseOut(bounce),
            draw(progress) {
                orangeBall.style.transform = `translateY(${toOrange * progress}px)`;
            }
        });
    }, 1000);
}