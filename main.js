class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.numbers = new Set();
    }

    connectedCallback() {
        this.generateNumbers();
        this.render();
    }

    generateNumbers() {
        this.numbers.clear();
        while (this.numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            this.numbers.add(randomNumber);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .number-container {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }
                .number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--secondary-color);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
            </style>
            <div class="number-container">
                ${[...this.numbers].sort((a, b) => a - b).map(number => `<div class="number">${number}</div>`).join('')}
            </div>
        `;
    }
}

customElements.define('lotto-numbers', LottoNumbers);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbersElement = document.querySelector('lotto-numbers');
    lottoNumbersElement.generateNumbers();
    lottoNumbersElement.render();
});
