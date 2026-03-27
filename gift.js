let confettiCtx, confettiCanvas;
let confettiPieces = [];
let confettiInterval;

// --- EASY CONFIG ---
// Change these two lines to customize name + closing text.
const CRUSH_NAME = 'NAME';
const FINAL_MESSAGE = 'A sky of pink wishes, soft laughter, and glitter-light moments that stay. Thank you for being the brightest color in my universe. Happy birthday, NAME.';

function replaceName(text, name) {
    return (text || '').replace(/NAME/g, name);
}

function applyCrushConfig(name = CRUSH_NAME, message = FINAL_MESSAGE) {
    const cleanName = name && name.trim() ? name.trim() : CRUSH_NAME;
    const resolvedMessage = replaceName(message, cleanName);

    const msg = document.getElementById('bday-message');
    const para = document.getElementById('final-paragraph');
    const nameSpan = msg ? msg.querySelector('.crush-name') : null;

    if (nameSpan) {
        nameSpan.textContent = cleanName;
    }
    if (msg) {
        msg.dataset.raw = `Happy Birthday, ${cleanName}!`;
        msg.textContent = msg.dataset.raw;
    }
    if (para) {
        para.textContent = resolvedMessage;
    }
    return { cleanName, resolvedMessage };
}

// Expose quick setters so you can change name/message anytime (console or other scripts)
window.setCrush = function(name, message = FINAL_MESSAGE) {
    applyCrushConfig(name, message);
    const msg = document.getElementById('bday-message');
    resetMessageLetters(msg);
};

window.initPage5 = function () {
    const giftBox = document.getElementById('gift-box');
    const msg = document.getElementById('bday-message');
    const para = document.getElementById('final-paragraph');
    applyCrushConfig();
    const giftSfx = document.getElementById('sfx-gift');
    const confettiSfx = document.getElementById('sfx-confetti');

    // Confetti setup
    confettiCanvas = document.getElementById('confettiCanvas');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCtx = confettiCanvas.getContext('2d');

    giftBox.classList.remove('opened');
    msg.classList.remove('show');
    para.classList.remove('show');
    msg.classList.add('hidden');
    para.classList.add('hidden');
    resetMessageLetters(msg);

    giftBox.onclick = () => {
        giftBox.classList.add('opened');
        msg.classList.remove('hidden');
        para.classList.remove('hidden');
        animateBirthdayMessage(msg);
        msg.classList.add('show');
        setTimeout(() => para.classList.add('show'), 300);
        giftSfx && giftSfx.play().catch(()=>{});
        confettiSfx && setTimeout(() => confettiSfx.play().catch(()=>{}), 200);
        startConfetti();
        spawnFinalHearts();
    };
};

function resetMessageLetters(el) {
    if (!el) return;
    if (!el.dataset.raw) {
        el.dataset.raw = el.textContent;
    }
    el.innerHTML = el.dataset.raw;
}

function animateBirthdayMessage(el) {
    if (!el) return;
    const raw = el.dataset.raw || el.textContent;
    el.innerHTML = '';
    [...raw].forEach((char, idx) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'burst-letter';
        if (/[!❤️❤,]/.test(char) || idx % 5 === 0) {
            span.classList.add('accent');
        }
        span.style.animationDelay = `${idx * 60}ms`;
        el.appendChild(span);
    });
}

function startConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 120; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            w: Math.random() * 8 + 4,
            h: Math.random() * 12 + 6,
            color: `hsl(${Math.random() * 360}, 90%, 65%)`,
            speed: Math.random() * 3 + 2,
            swing: Math.random() * 2,
        });
    }
    if (confettiInterval) cancelAnimationFrame(confettiInterval);
    const loop = () => {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiPieces.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.y * 0.01) * p.swing;
            if (p.y > confettiCanvas.height) p.y = -20;
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(p.x, p.y, p.w, p.h);
        });
        confettiInterval = requestAnimationFrame(loop);
    };
    loop();
}

function spawnFinalHearts() {
    const page = document.getElementById('page5');
    if (!page) return;
    for (let i = 0; i < 16; i++) {
        const h = document.createElement('div');
        h.className = 'final-heart';
        h.textContent = '♥';
        h.style.left = `${Math.random() * 100}%`;
        h.style.bottom = `${Math.random() * 40}px`;
        h.style.animationDuration = `${4 + Math.random() * 3}s`;
        page.appendChild(h);
        setTimeout(() => h.remove(), 7000);
    }
}
