class DinnerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.menus = [
            'Pizza', 'Burger', 'Sushi', 'Pasta', 'Kimchi Stew', 
            'Bibimbap', 'Fried Chicken', 'Tacos', 'Ramen', 'Steak',
            'Tteokbokki', 'Gimbap', 'Pork Cutlet', 'Samgyeopsal'
        ];
        this.selectedMenu = '';
    }

    connectedCallback() {
        this.recommendMenu();
        this.render();
    }

    recommendMenu() {
        const randomIndex = Math.floor(Math.random() * this.menus.length);
        this.selectedMenu = this.menus[randomIndex];
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .menu-display {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--primary-color);
                    margin: 20px 0;
                    padding: 20px;
                    border: 2px dashed var(--secondary-color);
                    border-radius: 10px;
                    background-color: rgba(0,0,0,0.05);
                }
            </style>
            <div class="menu-display">
                ${this.selectedMenu || 'Press the button!'}
            </div>
        `;
    }
}

customElements.define('dinner-menu', DinnerMenu);

document.getElementById('generate-btn').addEventListener('click', () => {
    const menuElement = document.querySelector('dinner-menu');
    menuElement.recommendMenu();
    menuElement.render();
});

// Theme toggle logic
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});
