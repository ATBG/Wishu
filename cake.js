let candlesExtinguished = 0;

window.initPage4 = function () {
    const container = document.getElementById('candles-container');
    if (!container) return;
    container.innerHTML = '';
    candlesExtinguished = 0;

    const candleCount = 5;
    for (let i = 0; i < candleCount; i++) {
        const candle = document.createElement('div');
        candle.classList.add('candle');
        const flame = document.createElement('div');
        flame.classList.add('flame');
        candle.appendChild(flame);
        candle.addEventListener('click', () => extinguishCandle(flame, candleCount));
        container.appendChild(candle);
    }

    // Mic-based blowing fallback not implemented; hint text covers clicking.
};

function extinguishCandle(flame, total) {
    if (flame.dataset.out === '1') return;
    flame.dataset.out = '1';
    flame.style.animation = 'none';
    flame.style.opacity = '0';
    candlesExtinguished++;
    if (candlesExtinguished >= total) {
        setTimeout(() => goToPage(5), 800);
    }
}
