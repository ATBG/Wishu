// Globals
let currentPage = 1;

// Sparkle Effect Logic
function createSparkles() {
    const container = document.getElementById('particles-container');
    const sparkleCount = 70;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position, size, and animation delay
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 3;
        
        sparkle.style.left = `${x}vw`;
        sparkle.style.top = `${y}vh`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.animationDelay = `${delay}s`;

        container.appendChild(sparkle);
    }
}

function createOrbs() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const orbCount = 6;
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'orb';
        const size = Math.random() * 120 + 140;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${Math.random() * 90}%`;
        orb.style.top = `${Math.random() * 90}%`;
        orb.style.animationDuration = `${14 + Math.random() * 10}s`;
        orb.style.animationDelay = `${Math.random() * 8}s`;
        container.appendChild(orb);
    }
}

// Page Transition Logic
function goToPage(pageNumber) {
    const current = document.getElementById(`page${currentPage}`);
    const next = document.getElementById(`page${pageNumber}`);
    
    if(current) {
        current.classList.remove('active');
        setTimeout(() => {
            current.classList.add('hidden');
        }, 1000); // 1s transition matching CSS
    }

    if(next) {
        next.classList.remove('hidden');
        // Force reflow
        void next.offsetWidth;
        next.classList.add('active');
        
        // Trigger specific page initialization
        if (pageNumber === 2) {
            initPage2();
        } else if (pageNumber === 3) {
            initPage3();
        } else if (pageNumber === 4) {
            initPage4();
        } else if (pageNumber === 5) {
            initPage5();
        }
    }
    
    currentPage = pageNumber;
}

// Ensure DOM is loaded before starting
document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
    createOrbs();
    
    // Start Page 1 timeline
    setTimeout(() => {
        // Animation CSS takes ~2s, let's start tree growth at 2s
        if(window.startTreeGrowth) {
            window.startTreeGrowth();
        }
    }, 1800);
});
