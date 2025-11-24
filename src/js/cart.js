document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
});

function renderCart() {
    const cartItemsContainer = document.querySelector(".cart__table");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = `<div class="cart__header">
        <span>Image</span>
        <span>Product Name</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span>Delete</span>
      </div>`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
        <div class="cart__header">
        <span>Image</span>
        <span>Product Name</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span>Delete</span>
      </div>
            <p class="empty-cart">Your cart is empty. Use the catalog to add new items.</p>
        `;
        updateSummary();
        return;
    }

    cart.forEach((product, index) => {
        const total = product.price * product.quantity;

        const item = document.createElement("div");
        item.classList.add("cart__item");

        item.innerHTML = `
            <div class="cart__img">
                <img src="${product.imageUrl}" alt="${product.name}">
            </div>

            <div class="cart__name">${product.name}</div>

            <div class="cart__price">$${product.price}</div>

            <div class="cart__quantity">
                <button class="qty-minus qty-btn" data-index="${index}">-</button>
                <span class="qty-value">${product.quantity}</span>
                <button class="qty-plus qty-btn" data-index="${index}">+</button>
            </div>

            <div class="cart__total">$${total}</div>

            <button class="cart__delete" data-index="${index}"><img class="cart__delete" src="/src/assets/images/My Cart/delete.png"></button>
        `;

        cartItemsContainer.appendChild(item);
    });

    updateSummary();
}


// QUANTITY BUTTONS
document.addEventListener("click", (e) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (e.target.classList.contains("qty-plus")) {
        const i = e.target.dataset.index;
        cart[i].quantity++;
    }

    if (e.target.classList.contains("qty-minus")) {
        const i = e.target.dataset.index;
        cart[i].quantity = Math.max(1, cart[i].quantity - 1);
    }

    if (e.target.classList.contains("cart__delete")) {
        const i = e.target.dataset.index;
        cart.splice(i, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
});


// CLEAR CART
document.addEventListener("click", (e) => {
    if (e.target.textContent === "CLEAR SHOPPING CART") {
        localStorage.removeItem("cart");
        renderCart();
        updateCartCount();
    }
});

// CHECKOUT
document.addEventListener("click", (e) => {
    if (e.target.textContent === "CHECKOUT") {
        localStorage.removeItem("cart");
        document.querySelector(".cart__table").innerHTML =
            `<p class="thanks">Thank you for your purchase.</p>`;
        updateSummary();
        updateCartCount();
    }
});

// SUMMARY (TOTALS + DISCOUNT)
function updateSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;
    cart.forEach(item => subtotal += item.price * item.quantity);

    // Якщо кошик порожній → 0 доставки
    let shipping = cart.length > 0 ? 30 : 0;

    // Знижка 10% якщо > 3000
    let discount = subtotal > 3000 ? subtotal * 0.10 : 0;

    let total = subtotal - discount + shipping;

    const rows = document.querySelectorAll(".summary-row");

    rows[0].querySelector("span:last-child").textContent = "$" + subtotal.toFixed(2);

    rows[1].querySelector("span:last-child").textContent = "-$" + discount.toFixed(2);

    rows[2].querySelector("span:last-child").textContent = "$" + shipping.toFixed(2);

    document.querySelector(".total span:last-child").textContent = "$" + total.toFixed(2);
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


