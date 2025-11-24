//header html
function loadHeader() {
  const header = `<header class="headContainer">
    <section class="headContainerContent">
        <div class="headTop">
            <address class="socials" aria-label="Social media">
                <a href="https://facebook.com" aria-label="Facebook">
                    <img src="/src/assets/images/header/facebook.svg" alt="Facebook logo">
                </a>
                <a href="https://twitter.com" aria-label="Twitter">
                    <img src="/src/assets/images/header/twitter.svg" alt="Twitter logo">
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                    <img src="/src/assets/images/header/instagram.svg" alt="Instagram logo">
                </a>
            </address>

            <a href="/src/index.html" class="headLogo" aria-label="Go to homepage">
                <span class="headLogoImg">
                    <img src="/src/assets/images/header/imageT.svg" alt="Best Shop logo">
                </span>
                <span class="headLogoText">BEST SHOP</span>
            </a>

            <nav class="headIcons">
                <button id="openLoginModal" aria-label="Open login form">
                    <img src="/src/assets/images/header/user.svg" alt="user-login-icon">
                </button>
                <button id="cartButton" aria-label="Open cart">
                    <img src="/src/assets/images/header/shopping-cart.svg" alt="shopping-cart">
                    <span id="cartCount" class="cart-count">0</span>
                </button>
                <button
                  class="burger-btn"
                  aria-label="Open menu"
                  aria-expanded="false"
                  aria-controls="main-nav"
                >
          <span></span><span></span><span></span>
        </button>
            </nav>
        </div>

        <hr class="headDivider">

        <nav class="headNav">
            <a href="/src/index.html">Home</a>

            <div class="catalog-trigger">
  <a href="/src/html/catalog.html">
    Catalog
    <img src="/src/assets/images/header/arrow.svg" alt="arrow-catalog">
  </a>

  <div class="filters-popup">

    <h3 class="filters-title">Filters</h3>

    <div class="filters-row">

      <div class="filter-block">
        <label>Size</label>
        <div class="dropdown">
          <button class="dropdown-btn">Choose option</button>
          <ul class="dropdown-list">
            <li>S</li>
            <li>M</li>
            <li>L</li>
            <li>XL</li>
            <li>S-L</li>
            <li>S, M, XL</li>
          </ul>
        </div>
      </div>

      <div class="filter-block">
        <label>Color</label>
        <div class="dropdown">
          <button class="dropdown-btn">Choose option</button>
          <ul class="dropdown-list">
            <li>red</li>
            <li>blue</li>
            <li>green</li>
            <li>black</li>
            <li>grey</li>
            <li>yellow</li>
            <li>pink</li>
          </ul>
        </div>
      </div>

      <div class="filter-block">
        <label>Category</label>
        <div class="dropdown">
          <button class="dropdown-btn">Choose option</button>
          <ul class="dropdown-list">
            <li>carry-ons</li>
            <li>suitcases</li>
            <li>luggage sets</li>
            <li>kids' luggage</li>
          </ul>
        </div>
      </div>

      <div class="filter-block sales-block">
        <label>Sales</label>
        <input type="checkbox" id="salesCheck">
      </div>

    </div>

    <hr class="filters-divider">

    <div class="filters-buttons">
      <button class="clear-filters">CLEAR FILTERS</button>
    </div>

  </div>
</div>

            <a href="/src/html/about.html">About Us</a>
            <a href="/src/html/contact.html">Contact Us</a>
        </nav>
   </section>
</header>
`;
  document.body.insertAdjacentHTML("afterbegin", header);
}
//footer html
function loadFooter() {
  const footer = `<footer class="footerContainer">
        <section class="upContent">
           <div class="benefitsContainer">
                <img class="wave-bg wave1" src="/src/assets/images/footer/Path 22.svg" alt="wave" />
                <img class="wave-bg wave2" src="/src/assets/images/footer/Path 21.svg" alt="wave" />
                <img class="wave-bg wave3" src="/src/assets/images/footer/Path 20.svg" alt="wave" />
                <img class="wave-bg wave4" src="/src/assets/images/footer/Path 19.svg" alt="wave" />
                <img class="wave-bg wave5" src="/src/assets/images/footer/Path 18.svg" alt="wave" />
                <img class="wave-bg wave6" src="/src/assets/images/footer/Path 17.svg" alt="wave" />
                <h3 class="benefitsTitle">Our Benefits</h3>

                    <div class="benefitsRow">
                        <div class="benefit">
                            <img src="/src/assets/images/footer/plane.svg" alt="plane icon" />
                            <p>Velit nisl sodales eget donec quis. volutpat orci.</p>
                    </div>

                    <div class="benefit">
                        <img src="/src/assets/images/footer/truck.svg" alt="truck icon" />
                        <p>Dolor eu varius. Morbi fermentum velit nisl.</p>
                    </div>

                    <div class="benefit">
                        <img src="/src/assets/images/footer/coin.svg" alt="coins icon" />
                        <p>Malesuada fames ac ante ipsum primis in faucibus.</p>
                    </div>

                    <div class="benefit">
                        <img src="/src/assets/images/footer/hat.svg" alt="hat icon" />
                        <p>Nisl sodales eget donec quis. volutpat orci.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="otherContent">
            <div class="otherContentAbout">
                <a href="/src/html/about.html">About Us</a>
                <p>Organisation <br>Partners <br>Clients</p>
            </div>
            <div class="otherContentInteresting">
                <p> <span>Interesting Links</span> <br>Photo Gallery <br>Our Team <br>Socials</p>
            </div>
            <div class="otherContentAchievements">
                <p><span>Achievements</span> <br> Winning Awards <br> Press <br> Our Amazing Clients</p>
            </div>
            <div class="otherContentShipping">
                <p><span>Shipping Infromation</span><br>Nulla eleifend pulvinar pururs, molestie euismod odio imperdiet ac.
                    Ut sit amet erat nec nibh <br>rhoncus varius is non lorem. Donec interdum, lectus in convallis pulvinar, enim elit porta sapien, <br>
                    vel finibus erat felis sed neque. Etiam aliquet neque sagittis erat tincidunt aliquam.
                </p>
            </div>
            <div class="otherContentContact">
                <a href="/src/html/contact.html">Contact Us</a>
                <p>Bendum dolor eu varius. Morbi fermentum velitsodales <br> egetonec. volutpat orci. Sed ipsum felis, tristique <br>
                egestas et, convallis ac velitn consequat nec luctus.
                </p>
                <div class="contactInfo">
                    <p><img src="/src/assets/images/footer/icon.svg" alt="Phone icon">Phone (+63) 236 6322</p>
                    <p><img src="/src/assets/images/footer/icon (1).svg" alt="mail icon">public@news.com</p>
                    <p><img src="/src/assets/images/footer/Union 6.svg" alt="time icon">Mon - Fri: 10am - 6pm <br>
                        Sat - Sun: 10am - 6pm
                    </p>
                    <p> <img src="/src/assets/images/footer/Union 11.svg" alt="geolocation icon">639 Jade Valley, <br>
                        Washingtom Dc    
                    </p>
                </div>
                
            </div>
        </section>
        <div class="coop">
            <p >© Copyright 2025</p>
        </div>
        
    </footer>`;
  document.body.insertAdjacentHTML("beforeend", footer);
}
//login window html
function loginModal() {
  const modalHTML = `
    <div class="modal" id="loginModal" role="dialog" aria-modal="true" hidden>
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <button class="modal__close" aria-label="Close login form">✕</button>
            <form class="login-form" id="loginForm">
                <label for="email">Email address *</label>
                <input type="text" id="email" name="email" required>
                <span class="error-text" id="emailError"></span>

                <label for="password">Password *</label>
                <div class="password-wrapper">
                    <input type="password" id="password" name="password" required minlength="6">
                    <button type="button" class="toggle-password" aria-label="Show password">
                        <img src="/src/assets/images/Homepage/eye.svg" alt="Show password icon">
                    </button>
                </div>
                <span class="error-text" id="passwordError"></span>

                <div class="form-options">
                    <label class="remember-me">
                       <input type="checkbox" id="remember"> Remember me
                    </label>
                    <a href="#" class="forgot-link">Forgot your password?</a>
                </div>

                <button type="submit" class="login-form__btn">LOG IN</button>
            </form>
    </div>
</div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// function call add header, footer and active class
document.addEventListener("DOMContentLoaded", () => {
  //call header and footer function
  loadHeader();
  loadFooter();
  const headContainer = document.querySelector(".headContainer");
  const burgerBtn = document.querySelector(".burger-btn");
  const headNav = document.querySelector(".headNav");

  if (!headContainer || !burgerBtn || !headNav) return;

  burgerBtn.addEventListener("click", () => {
    const isOpen = headContainer.classList.toggle("nav-open");
    burgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

    document.body.classList.toggle("no-scroll", isOpen);
  });

  headNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    headContainer.classList.remove("nav-open");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  });

  //check and add active class at element
  const navLinks = document.querySelectorAll(".headNav a");
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkFile = new URL(link.href).pathname.split("/").pop();
    if (linkFile === currentFile) {
      link.classList.add("active");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((l) => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
    });
  });

  loginModal();
  //function open login modal window
  const openBtn = document.getElementById("openLoginModal");
  const modal = document.getElementById("loginModal");
  const closeBtn = modal.querySelector(".modal__close");
  const overlay = modal.querySelector(".modal__overlay");

  openBtn.addEventListener("click", () => {
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  });

  [closeBtn, overlay].forEach((el) =>
    el.addEventListener("click", () => {
      modal.setAttribute("hidden", "");
      document.body.style.overflow = "";
    })
  );
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Email RegEx pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  // Show/hide password toggle
  document.querySelector(".toggle-password").addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  });

  // Form validation
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password === "") {
      alert("Password is required.");
      return;
    }
    alert("Login successful!");
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
    loginForm.reset();
  });
  const cartB = document.getElementById("cartButton");
  cartB.addEventListener("click", () => {
    window.location.href = "/src/html/cart.html";
  });
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const badge = document.getElementById("cartCount");

    if (!badge) return;

    if (count > 0) {
      badge.textContent = count;
      badge.style.display = "flex"; // показуємо
    } else {
      badge.style.display = "none"; // приховуємо
    }
  }
  updateCartCount();
  const isCatalogPage = document.body.classList.contains("catalog-page");
  if (!isCatalogPage) return;

  const catalogLink = document.querySelector(".catalog-trigger > a");
  const filtersPopup = document.querySelector(".catalog-page .filters-popup");

  if (!catalogLink || !filtersPopup) return;

  catalogLink.addEventListener("click", (e) => {
    const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;

    if (!isSmallScreen) return;
    e.preventDefault();
    e.stopPropagation();
    filtersPopup.classList.toggle("is-open");
  });

  document.addEventListener("click", (event) => {
    if (!filtersPopup.classList.contains("is-open")) return;

    const clickInsideTrigger = event.target.closest(".catalog-trigger");
    const clickInsidePopup = event.target.closest(".filters-popup");

    if (!clickInsideTrigger && !clickInsidePopup) {
      filtersPopup.classList.remove("is-open");
    }
  });
});
