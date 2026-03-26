const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');

let cw = window.innerWidth;
let ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

window.addEventListener('resize', () => {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
    // We only redraw if the tree is already fully grown (static). 
    // Otherwise, we skip resizing mid-animation for simplicity.
    if(isFullyGrown) {
        drawStaticTree(ctx, cw/2, ch, -Math.PI/2, Math.min(cw, ch) * 0.2, 10);
    }
});

let isFullyGrown = false;

// Tree parameters
const maxBranchLevel = 9;
const branchColor = "#5c4033"; // brown trunk
let leaves = []; // Store leaf positions to draw hearts

// Function exposed to global scope via window
window.startTreeGrowth = function() {
    const startX = cw / 2;
    const startY = ch; // Bottom of screen
    const initialLen = ch * 0.25; // Scale tree based on screen height
    
    // Clear canvas before drawing
    ctx.clearRect(0, 0, cw, ch);
    leaves = [];
    isFullyGrown = false;
    
    animateBranch(startX, startY, -Math.PI / 2, initialLen, maxBranchLevel, () => {
        isFullyGrown = true;
        // Move to next page after tree finishes and a short delay
        setTimeout(() => {
            goToPage(2);
        }, 1500);
    });
};

function animateBranch(startX, startY, angle, length, level, onComplete) {
    if (level === 0) {
        // Collect leaf positions for hearts
        leaves.push({ x: startX, y: startY, scale: Math.random() * 0.5 + 0.5 });
        drawHeart(ctx, startX, startY, 15 * (Math.random() + 0.5), getRandomPink());
        if(onComplete) onComplete();
        return;
    }

    const endX = startX + Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;
    const branchWidth = level * 1.5;
    
    // Animation details
    let currentLen = 0;
    const speed = length / 10; // Frames to complete branch

    function drawFrame() {
        if (currentLen < length) {
            currentLen += speed;
            const cx = startX + Math.cos(angle) * currentLen;
            const cy = startY + Math.sin(angle) * currentLen;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = branchColor;
            ctx.lineWidth = branchWidth;
            ctx.lineCap = 'round';
            ctx.stroke();

            requestAnimationFrame(drawFrame);
        } else {
            // Branch complete, spawn children
            const leftAngle = angle - (Math.random() * 0.3 + 0.2);
            const rightAngle = angle + (Math.random() * 0.3 + 0.2);
            const nextLength = length * 0.75; // Shrink child branches
            
            // To know when the entire tree is done, we could counter async branches,
            // but for simplicity we rely on a rough timeout or pass down completion
            let branchesComplete = 0;
            const checkCompletion = () => {
                branchesComplete++;
                if(branchesComplete === 2 && onComplete) {
                    onComplete();
                }
            };

            animateBranch(endX, endY, leftAngle, nextLength, level - 1, checkCompletion);
            animateBranch(endX, endY, rightAngle, nextLength, level - 1, checkCompletion);
        }
    }

    drawFrame();
}

// Drawing a static tree for Page 2 / resize
function drawStaticTree(ctx, startX, startY, angle, length, level) {
    if (level === 0) {
        drawHeart(ctx, startX, startY, 15, getRandomPink());
        return;
    }

    const endX = startX + Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = branchColor;
    ctx.lineWidth = level * 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    drawStaticTree(ctx, endX, endY, angle - 0.35, length * 0.75, level - 1);
    drawStaticTree(ctx, endX, endY, angle + 0.35, length * 0.75, level - 1);
}

// Ensure initPage2 can draw the tree on the left
window.drawTreeOnLeft = function() {
    const p2Canvas = document.getElementById('treeCanvasPage2');
    const p2Ctx = p2Canvas.getContext('2d');
    // adjust internal size to match CSS size
    p2Canvas.width = p2Canvas.offsetWidth;
    p2Canvas.height = p2Canvas.offsetHeight;
    
    p2Ctx.clearRect(0, 0, p2Canvas.width, p2Canvas.height);
    // Draw smaller, on the left
    drawStaticTree(p2Ctx, p2Canvas.width / 2, p2Canvas.height, -Math.PI / 2, p2Canvas.height * 0.25, 9);
};

// Utils
function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30); // Base size is roughly 30x30
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    // Heart shape bezier
    ctx.bezierCurveTo(-15, -15, -25, 10, 0, 20);
    ctx.bezierCurveTo(25, 10, 15, -15, 0, 0);
    ctx.fill();
    ctx.restore();
}

function getRandomPink() {
    const pinks = ['#ff99cc', '#ff66b3', '#ff3399', '#ff0080', '#e60073', '#cc0066'];
    return pinks[Math.floor(Math.random() * pinks.length)];
}
