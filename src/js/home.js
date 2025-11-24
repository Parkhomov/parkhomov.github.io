// function add suitcase to block selected products and new arrival
async function loadProducts() {
    try {
        //selected products
        const response = await fetch('/src/assets/data.json');
        const data = await response.json();

        const selectedProducts = data.data.filter(product =>
            product.blocks.includes("Selected Products")
        );

        const container = document.getElementById('products-container');

        container.innerHTML = '';

        selectedProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.addEventListener("click", () => {
          sessionStorage.setItem("selectedProductId", product.id);
        });
        card.innerHTML = `
            <div class="sale">SALE</div>
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart">Add To Cart</button> 
        `;
        container.appendChild(card);
    });
    //new products arrival
     const newProducts = data.data.filter(product =>
            product.blocks.includes("New Products Arrival")
        );

        const containerNew = document.getElementById('newProducts-container');

        containerNew.innerHTML = '';

        newProducts.forEach(product => {
        const newCard = document.createElement('div');
        newCard.classList.add('newProduct-card');
        newCard.addEventListener("click", () => {
          sessionStorage.setItem("selectedProductId", product.id);
        });
        newCard.innerHTML = `
             ${product.salesStatus ? '<div class="sale">SALE</div>' : ''}
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button>View Product</button> 
        `;

        containerNew.appendChild(newCard);
    });

    } catch (error) {
        console.error("error load", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartCount();
    //slider travel suitcase
    const travelSlider = document.querySelector(".travel-slider");

    function slideNext() {
        const firstCard = travelSlider.firstElementChild;
        const clone = firstCard.cloneNode(true); 
        clone.style.opacity = "0";

        travelSlider.appendChild(clone); 
        travelSlider.style.transition = "transform 0.8s ease";
        travelSlider.style.transform = "translateX(-312px)"; 

 
        setTimeout(() => {
            travelSlider.style.transition = "none";
            travelSlider.style.transform = "translateX(0)";
            travelSlider.removeChild(firstCard); 
            requestAnimationFrame(() => {
                clone.style.transition = "opacity 0.8s ease";
                clone.style.opacity = "1";
            });
        }, 900);
    }

    setInterval(slideNext, 5000);
   
    document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent === "Add To Cart") {
        const card = e.target.closest(".product-card");
        if (!card) return;

        const product = {
            name: card.querySelector("h3").textContent,
            price: Number(card.querySelector(".price").textContent.replace("$", "")),
            imageUrl: card.querySelector("img").src,
            quantity: 1
        };

        addToCart(product);
    }
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
        item => item.name === product.name
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const badge = document.getElementById("cartCount");

    if (!badge) return;

    if (count > 0) {
        badge.textContent = count;
        badge.style.display = "flex";  // показуємо
    } else {
        badge.style.display = "none";  // приховуємо
    }
}
})

