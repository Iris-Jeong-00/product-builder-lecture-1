class DinnerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.menus = [
            { name: 'Pizza', description: 'Cheesy, savory, and perfect for sharing. Whether you like pepperoni or veggies, it is always a crowd-pleaser.' },
            { name: 'Burger', description: 'A juicy patty between soft buns. Customize it with cheese, lettuce, and your favorite sauces for a satisfying meal.' },
            { name: 'Sushi', description: 'Fresh and delicate. A great option if you want something light yet flavorful, featuring rice and fresh seafood.' },
            { name: 'Pasta', description: 'From creamy Carbonara to tangy Tomato Basil, pasta offers endless variety for a comforting dinner.' },
            { name: 'Kimchi Stew', description: 'Spicy, hearty, and soul-warming. This traditional Korean stew is perfect with a bowl of white rice.' },
            { name: 'Bibimbap', description: 'A healthy mix of rice, vegetables, meat, and gochujang. Mix it all up for a burst of flavor in every bite.' },
            { name: 'Fried Chicken', description: 'Crispy on the outside, juicy on the inside. Perfect with a cold drink or pickled radishes.' },
            { name: 'Tacos', description: 'Fun to eat and full of zest. Soft or hard shells filled with seasoned meat and fresh toppings.' },
            { name: 'Ramen', description: 'Quick, hot, and delicious. Whether instant or authentic Japanese style, it is the ultimate comfort food.' },
            { name: 'Steak', description: 'Rich and protein-packed. A well-cooked steak is a luxurious treat for a special evening.' },
            { name: 'Tteokbokki', description: 'Chewy rice cakes in a spicy sauce. A popular Korean street food that brings a kick of heat.' },
            { name: 'Gimbap', description: 'Korean seaweed rice rolls. Packed with veggies and meat, it is a convenient and balanced meal.' },
            { name: 'Pork Cutlet', description: 'Crispy breaded pork cutlet served with savory sauce. A favorite for both kids and adults.' },
            { name: 'Samgyeopsal', description: 'Grilled pork belly. Best enjoyed wrapped in lettuce with garlic and dipping sauce.' }
        ];
        this.selectedMenu = null;
    }

    connectedCallback() {
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
                    text-align: center;
                    margin: 20px 0;
                    padding: 30px;
                    border: 2px dashed var(--secondary-color, #33FF57);
                    border-radius: 15px;
                    background-color: var(--container-bg, #fff);
                    color: var(--text-color, #333);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }
                h3 {
                    font-size: 2.5rem;
                    margin: 0 0 15px 0;
                    color: var(--primary-color, #FF5733);
                }
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: var(--text-color, #333);
                    margin: 0;
                }
                .placeholder {
                    color: #888;
                    font-style: italic;
                }
            </style>
            <div class="menu-display">
                ${this.selectedMenu 
                    ? `<h3>${this.selectedMenu.name}</h3><p>${this.selectedMenu.description}</p>` 
                    : '<div class="placeholder">Press the button to get a recommendation!</div>'}
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
