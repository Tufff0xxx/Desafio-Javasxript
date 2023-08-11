const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pizzaForm');
    const container = document.getElementById('pizzaContainer');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const pizzaId = parseInt(document.getElementById('pizzaId').value);

        if (isNaN(pizzaId)) {
            renderError("Por favor, ingresa un número válido.");
            return;
        }

        const foundPizza = getPizzaById(pizzaId);
        if (foundPizza) {
            renderPizzaCard(foundPizza);
            saveToLocalStorage(foundPizza);
        } else {
            renderError("No se encontró una pizza con el número ingresado.");
            clearLocalStorage();
        }
    });

    function getPizzaById(id) {
        return pizzas.find(pizza => pizza.id === id) || null;
    }

    function renderPizzaCard(pizza) {
        const cardHtml = `
            <div class="card">
                <h2>${pizza.nombre}</h2>
                <img src="${pizza.imagen}" alt="${pizza.nombre}">
                <p>Precio: $${pizza.precio}</p>
            </div>
        `;
        container.innerHTML = cardHtml;
    }

    function renderError(errorMessage) {
        const errorHtml = `<p class="error">${errorMessage}</p>`;
        container.innerHTML = errorHtml;
    }

    function saveToLocalStorage(pizza) {
        localStorage.setItem('lastPizza', JSON.stringify(pizza));
    }

    function clearLocalStorage() {
        localStorage.removeItem('lastPizza');
    }

    function getFromLocalStorage() {
        const lastPizzaJson = localStorage.getItem('lastPizza');
        return lastPizzaJson ? JSON.parse(lastPizzaJson) : null;
    }

    const lastPizza = getFromLocalStorage();
    if (lastPizza) {
        renderPizzaCard(lastPizza);
    }
});
