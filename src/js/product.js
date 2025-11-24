async function loadProductsLike() {
  try {
    //you may also like
    const response = await fetch("/src/assets/data.json");
    const data = await response.json();

    const alsoLike = data.data.filter((product) =>
      product.blocks.includes("You May Also Like")
    );
    const containerLike = document.getElementById("alsoLike-container");

    containerLike.innerHTML = "";

    alsoLike.forEach((product) => {
      const newCard = document.createElement("div");
      newCard.classList.add("alsoLike-card");
      newCard.addEventListener("click", () => {
        sessionStorage.setItem("selectedProductId", product.id);
        loadProductPage();
      });
      newCard.innerHTML = `
             ${product.salesStatus ? '<div class="sale">SALE</div>' : ""}
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="add-to-cart">Add To Cart</button> 
        `;

      containerLike.appendChild(newCard);
    });
  } catch (error) {
    console.error("error load", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (
      e.target.tagName === "BUTTON" &&
      e.target.textContent === "Add To Cart"
    ) {
      const card = e.target.closest(".alsoLike-card");
      if (!card) return;

      const product = {
        name: card.querySelector("h3").textContent,
        price: Number(
          card.querySelector(".price").textContent.replace("$", "")
        ),
        imageUrl: card.querySelector("img").src,
        quantity: 1,
      };

      addToCart(product);
    }
  });

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.name === product.name);

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
    if (badge) {
      badge.textContent = count;
    }
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest(".add-to-cart")) return; // кошик не чіпаємо

    const card =
      e.target.closest(".catalogProduct-card") ||
      e.target.closest(".newProduct-card") ||
      e.target.closest(".product-card") ||
      e.target.closest(".alsoLike-card");

    if (!card) return;

    loadProductPage();
  });
});
async function loadProductPage() {
  const id = sessionStorage.getItem("selectedProductId");

  if (!id) {
    console.error("No product ID found in sessionStorage");
    return;
  }

  try {
    const response = await fetch("/src/assets/data.json");
    const data = await response.json();

    const allProducts = data.data;
    const product = allProducts.find((p) => p.id === id);

    if (!product) {
      console.error("Product not found");
      return;
    }

    renderProduct(product);
  } catch (err) {
    console.error("Fetch error", err);
  }
}

function renderProduct(product) {
  const container = document.querySelector("main");
  container.innerHTML = "";
  container.innerHTML = `
  <section class="product-page">
  <div class="product-wrapper">

    <div class="product-gallery">
      
        <img class="product-main-image" src="${product.imageUrl}" alt="${
    product.name
  }">
      <div class="product-thumbnails">
        <img class="thumb thumb-4" src="/src/assets/images/Product Card/suitcase-small-4.png" alt="thumbnail">
        <img class="thumb thumb-2" src="/src/assets/images/Product Card/suitcase-small-card-1.png" alt="thumbnail">
        <img class="thumb thumb-3" src="/src/assets/images/Product Card/suitcase-small-2.png" alt="thumbnail">
        <img class="thumb thumb-1" src="/src/assets/images/Product Card/yellow_open1.png" alt="thumbnail">
      </div>
    </div>

    <div class="product-info">
      <h2 class="product-title">${product.name}</h2>

      <div class="product-rating">
        <span class="stars">${"★".repeat(
          Math.round(product.rating)
        )}${"☆".repeat(5 - Math.round(product.rating))}</span>
        <span class="review-count">(1 Client Review)</span>
      </div>
      <div class="product-price">$${product.price}</div>

      <p class="product-description">
        The new Global Explorer Max Comfort Suitcase Pro is a bold reimagining of
        travel essentials, designed to elevate every journey. Made with at least 30%
        recycled materials, its lightweight yet impact-resistant shell combines eco-
        conscious innovation with rugged durability.
      </p>
      <p class="product-description">
        The ergonomic handle and GlideMotion spinner wheels ensure effortless  
        mobility while making a statement in sleek design. Inside, the modular
        compartments and adjustable straps keep your belongings secure and
        neatly organized, no matter the destination.   
      </p>

      <div class="product-options">

        <div class="option-block">
          <label>Size</label>
          <select id="sizeSelect">
            <option value="">Choose option</option>
          </select>
        </div>

        <div class="option-block">
          <label>Color</label>
          <select id="colorSelect">
            <option value="">Choose option</option>
          </select>
        </div>

        <div class="option-block">
          <label>Category</label>
          <select id="categorySelect">
            <option value="">Choose option</option>
          </select>
        </div>

      </div>

      <div class="product-cart-actions">
        <div class="quantity-selector">
          <button id="qtyMinus">-</button>
          <input id="qtyInput" type="number" value="1" min="1">
          <button id="qtyPlus">+</button>
        </div>

        <button class="add-to-cart-btn" id="addToCartBtn">
          Add To Cart
        </button>
      </div>

      <div class="payment-icons">
        <span>Payment:</span>
        <img src="/src/assets/images/Product Card/visa-pay-logo.png" alt="Visa">
        <img src="/src/assets/images/Product Card/americanExpress.png" alt="American Express">
        <img src="/src/assets/images/Product Card/Shape.png" alt="Mastercard">
        <img src="/src/assets/images/Product Card/paypal.png" alt="PayPal">
      </div>
    </div>
  </div>

  <div class="product-tabs">

    <div class="tabs-header">
      <button class="tab active" data-tab="details">DETAILS</button>
      <button class="tab" data-tab="reviews">REVIEWS</button>
      <button class="tab" data-tab="shipping">SHIPPING POLICY</button>
    </div>

    <div class="tabs-content">

      <div id="tab-details" class="tab-content active">
        <p>
          Vestibulum commodo sapien non elit porttitor, vitae volutpat nibh mollis. Nulla porta risus id neque tempor, in efficitur justo imperdiet. Etiam a ex at 
          ante tincidunt imperdiet. Nunc congue ex vel nisl viverra, sit amet aliquet lectus ullamcorper. Praesent luctus lacus non lorem elementum, eu tristique 
          sapien suscipit. Sed bibendum, ipsum nec viverra malesuada, erat nisi sodales purus, eget hendrerit dui ligula eu enim. Ut non est nisi. Pellentesque 
          tristique pretium dolor eu commodo. Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius eget urna sit amet luctus. Suspendisse potenti. 
          Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra dui auctor, ullamcorper turpis pharetra, facilisis quam.
        </p>
        <p>
          Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius eget urna sit amet luctus. Suspendisse potenti. Curabitur ac placerat est, sit amet sodales 
          risus. Pellentesque viverra dui auctor, ullamcorper turpis pharetra, facilisis quam. Proin iaculis nibh vitae lectus mollis bibendum. 
        </p>
        <p>
          Quisque varius eget urna sit amet luctus. Suspendisse potenti. Curabitur ac placerat est, sit amet sodales risus. Pellentesque viverra dui auctor, 
          ullamcorper turpis pharetra, facilisis quam.
        </p>
      </div>

     <div id="tab-reviews" class="tab-content">
  <div class="reviews-wrapper">

    <div class="existing-reviews">
      <h3>1 review for ${product.name}</h3>

      <div class="review-card">
        <img class="avatar" src="/src/assets/images/Product Card/review customer.png" alt="avatar">
        
        <div class="review-body">
          <div class="review-header">
            <strong>Ella Harper</strong>
            <span class="review-date">/ June 11, 2025</span>
            <span class="review-stars">★★★★☆</span>
          </div>

          <p class="review-text">
            Proin iaculis nibh vitae lectus mollis bibendum. Quisque varius eget urna sit amet luctus. 
            Suspendisse potenti curabitur ac placerat est, sit amet sodales risus.
          </p>
        </div>
      </div>
    </div>

    <form id="reviewForm" class="review-form">
      <h3>Add Review</h3>
      <p class="note">Your email address won’t be shared with anybody. Required fields have the symbol <span>*</span</p>

      <label class="rate-label">Rate Product</label>
      <div class="rating-stars" id="ratingStars">
        <h4>RATE PRODUCT</h4>
        <span class="active">★★★★★</span>
      </div>

      <textarea id="reviewMessage" placeholder="Your Review*"></textarea>

      <div class="input-row">
        <div class="input-field">
          <input type="text" id="reviewName" placeholder="Your Name*">
        </div>

        <div class="input-field">
          <input type="email" id="reviewEmail" placeholder="Your Email*">
        </div>
      </div>

      <label class="checkbox-row">
        <input type="checkbox"> Save my name, email, and website for next time.
      </label>

      <button type="submit" class="submit-btn">SUBMIT</button>

      <p id="reviewStatus" class="form-status"></p>
    </form>
  </div>
</div>

      
    </div>
  </div>
</section>
    <section class="alsoLike">
      <h2 class="alsoLikeTitle">You May Also Like</h2>
      <hr>
        <div id="alsoLike-container" class="alsoLikeGrid"></div>
    </section>
  `;
  loadProductsLike();
  const addBtn = document.getElementById("addToCartBtn");
  const qtyInput = document.getElementById("qtyInput");

  addBtn.addEventListener("click", () => {
    const productToCart = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: Number(qtyInput.value) || 1,
    };
    addToCart(productToCart);
  });
  const qtyMinus = document.getElementById("qtyMinus");
  const qtyPlus = document.getElementById("qtyPlus");
  const qtyInputField = document.getElementById("qtyInput");

  qtyMinus.addEventListener("click", () => {
    let value = Number(qtyInputField.value);
    if (value > 1) {
      qtyInputField.value = value - 1;
    }
  });

  qtyPlus.addEventListener("click", () => {
    let value = Number(qtyInputField.value);
    qtyInputField.value = value + 1;
  });
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // toggle active class on buttons
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // toggle content visibility
      contents.forEach((content) => {
        content.classList.remove("active");
      });

      document.getElementById(`tab-${target}`).classList.add("active");
    });
  });
  const reviewForm = document.getElementById("reviewForm");
  const reviewStatus = document.getElementById("reviewStatus");

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const message = document.getElementById("reviewMessage").value.trim();

    // simple validation
    if (!name || !message) {
      reviewStatus.textContent = "Please fill in all fields.";
      reviewStatus.style.color = "red";
      return;
    }

    // success message
    reviewStatus.textContent = "Thank you! Your review has been submitted.";
    reviewStatus.style.color = "green";

    // clear fields
    reviewForm.reset();

    setTimeout(() => {
      reviewStatus.textContent = "";
    }, 3000);
  });
}
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity;
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
  if (badge) badge.textContent = count;
}
window.loadProductPage = loadProductPage;
