let balloonsInitialized = false;
let balloonsPopped = 0;

const pastelColors = ['#ff99cc', '#ffb3de', '#ffcce6', '#ff80b3', '#ff66a3', '#ff99ff', '#ffb6c1'];

window.initPage3 = function () {
    const container = document.getElementById('balloon-container');
    if (!container) return;

    // Reset if revisiting
    container.innerHTML = '';
    balloonsPopped = 0;
    balloonsInitialized = true;

    const total = 10;
    for (let i = 0; i < total; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        balloon.style.background = `radial-gradient(circle at 30% 30%, #fff, ${color})`;
        balloon.style.setProperty('--balloon-base', color);
        balloon.style.left = `${Math.random() * 80 + 5}%`;
        balloon.style.animationDuration = `${Math.random() * 6 + 12}s`;
        balloon.style.animationDelay = `${Math.random() * 2}s`;

        balloon.addEventListener('click', (e) => popBalloon(e.currentTarget, total));
        container.appendChild(balloon);
    }
};

function popBalloon(balloon, total) {
    if (balloon.dataset.popped === '1') return;
    balloon.dataset.popped = '1';
    balloonsPopped++;

    // Burst particles
    for (let i = 0; i < 18; i++) {
        const particle = document.createElement('div');
        particle.classList.add('balloon-particle');
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 120}px`);
        particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 120}px`);
        particle.style.backgroundColor = balloon.style.getPropertyValue('--balloon-base') || '#ff3385';
        particle.style.left = `${balloon.offsetLeft + balloon.offsetWidth / 2}px`;
        particle.style.top = `${balloon.offsetTop + balloon.offsetHeight / 2}px`;
        balloon.parentElement.appendChild(particle);
        setTimeout(() => particle.remove(), 700);
    }

    balloon.remove();

    if (balloonsPopped >= total) {
        setTimeout(() => goToPage(4), 1000);
    }
}
