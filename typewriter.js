const messageLines = [
    "Hello there, beautiful...",
    "I made this little surprise just for you.",
    "Are you ready?"
];

let typeWriterActive = false;

window.initPage2 = function() {
    if (typeWriterActive) return;
    typeWriterActive = true;

    // First draw the static tree on the left canvas
    if(window.drawTreeOnLeft) {
        window.drawTreeOnLeft();
    }

    const textContainer = document.getElementById('typewriter-text');
    textContainer.innerHTML = '';
    
    let lineIndex = 0;
    let charIndex = 0;

    function typeChar() {
        if (lineIndex < messageLines.length) {
            const currentLine = messageLines[lineIndex];
            if (charIndex < currentLine.length) {
                // If it's the first character of a line, create a new span/div
                if (charIndex === 0) {
                    const lineDiv = document.createElement('div');
                    lineDiv.id = `line-${lineIndex}`;
                    textContainer.appendChild(lineDiv);
                }
                
                const currentLineDiv = document.getElementById(`line-${lineIndex}`);
                currentLineDiv.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 70); // typing speed
            } else {
                // finished line
                lineIndex++;
                charIndex = 0;
                setTimeout(typeChar, 500); // pause between lines
            }
        } else {
            // Typing complete, show button
            setTimeout(showProceedButton, 500);
        }
    }

    // append cursor element at the end of container dynamically if you want, 
    // or keep it simple with CSS blinking on the wrapper. Since we split by divs, 
    // CSS global cursor is harder. Let's just type out.
    
    setTimeout(typeChar, 1000); // Initial delay
};

function showProceedButton() {
    const btn = document.getElementById('proceed-btn');
    btn.classList.remove('hidden');
    
    btn.addEventListener('click', () => {
        goToPage(3);
    });
}
