const catalogState = {
  allProducts: [],
  currentProducts: [],
  selectedFilters: {
    category: null,
    color: null,
    size: null,
    salesStatus: null,
  },
  currentPage: 1,
  itemsPerPage: 12,
  topBestProducts: [],
  elements: {
    container: null,
    containerTop: null,
    sortSelect: null,
    resultsInfo: null,
    paginationWrapper: null,
    prevBtn: null,
    nextBtn: null,
  },
};

function initCatalogElements() {
  const container = document.getElementById("catalog-container");
  const containerTop = document.getElementById("topBest-container");
  const sortSelect = document.querySelector(".sort-select");
  const resultsInfo = document.getElementById("results-info");
  const paginationWrapper = document.querySelector(".page-numbers");
  const prevBtn = document.querySelector(".prev-page");
  const nextBtn = document.querySelector(".next-page");

  catalogState.elements = {
    container,
    containerTop,
    sortSelect,
    resultsInfo,
    paginationWrapper,
    prevBtn,
    nextBtn,
  };
}

function renderCatalog(products) {
  const { container } = catalogState.elements;
  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("catalogProduct-card");
    card.dataset.productId = product.id;

    card.innerHTML = `
      ${product.salesStatus ? '<div class="sale">SALE</div>' : ""}
      <img src="${product.imageUrl}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <button class="add-to-cart">Add To Cart</button>
    `;

    card.addEventListener("click", handleProductCardClick);
    container.appendChild(card);
  });
}

function handleProductCardClick(event) {
  const card = event.currentTarget;
  const productId = card.dataset.productId;

  if (!productId) return;

  sessionStorage.setItem("selectedProductId", productId);
}

function renderTopBest(products) {
  const { containerTop } = catalogState.elements;
  if (!containerTop) return;

  containerTop.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("topBest__item");

    const roundedRating = Math.round(product.rating || 0);
    const stars = "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);

    card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <div class="topBest__info">
        <h3>${product.name}</h3>
        <div class="rating">${stars}</div>
        <p class="price">$${product.price}</p>
      </div>
    `;

    containerTop.appendChild(card);
  });
}

function sortProducts(type) {
  const baseProducts = catalogState.allProducts.filter(
    (p) => !p.blocks.includes("Set")
  );
  let sorted = [...baseProducts];

  switch (type) {
    case "price-low":
      sorted.sort(
        (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
      );
      break;
    case "price-high":
      sorted.sort(
        (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
      );
      break;
    case "rating":
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "popular":
      sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    default:
      sorted = [...baseProducts];
  }

  catalogState.currentProducts = sorted;
  catalogState.currentPage = 1;
  updateCatalogPage();
}

function applyFilters() {
  let filtered = catalogState.allProducts.filter(
    (p) => !p.blocks.includes("Set")
  );

  const { category, color, size, salesStatus } = catalogState.selectedFilters;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (color) {
    filtered = filtered.filter((p) => p.color === color);
  }

  if (size) {
    filtered = filtered.filter((p) => p.size === size);
  }

  if (salesStatus !== null) {
    filtered = filtered.filter((p) => p.salesStatus === salesStatus);
  }

  catalogState.currentProducts = filtered;
  catalogState.currentPage = 1;
  updateCatalogPage();
}

function handleDropdownItemClick(event) {
  const item = event.currentTarget;
  const block = item.closest(".filter-block");
  const label = block.querySelector("label").textContent.trim();
  const btn = block.querySelector(".dropdown-btn");

  btn.textContent = item.textContent;

  block.querySelectorAll("li").forEach((li) => li.classList.remove("active"));
  item.classList.add("active");

  switch (label) {
    case "Category":
      catalogState.selectedFilters.category = item.textContent;
      break;
    case "Color":
      catalogState.selectedFilters.color = item.textContent;
      break;
    case "Size":
      catalogState.selectedFilters.size = item.textContent;
      break;
    default:
      break;
  }

  applyFilters();
}

function initFilterDropdowns() {
  const dropdownItems = document.querySelectorAll(".dropdown-list li");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", handleDropdownItemClick);
  });
}

function handleSalesChange(event) {
  const salesCheckbox = event.currentTarget;
  catalogState.selectedFilters.salesStatus = salesCheckbox.checked ? true : null;
  applyFilters();
}

function initSalesFilter() {
  const salesCheckbox = document.getElementById("salesCheck");
  if (!salesCheckbox) return;

  salesCheckbox.addEventListener("change", handleSalesChange);
}

function onClearFiltersClick() {
  catalogState.selectedFilters = {
    category: null,
    color: null,
    size: null,
    salesStatus: null,
  };

  document
    .querySelectorAll(".dropdown-btn")
    .forEach((btn) => (btn.textContent = "Choose option"));

  document
    .querySelectorAll(".dropdown-list li")
    .forEach((li) => li.classList.remove("active"));

  const salesCheckbox = document.getElementById("salesCheck");
  if (salesCheckbox) {
    salesCheckbox.checked = false;
  }

  applyFilters();
}

function initClearFilters() {
  const clearBtn = document.querySelector(".clear-filters");
  if (!clearBtn) return;

  clearBtn.addEventListener("click", onClearFiltersClick);
}

function getPaginatedProducts() {
  const start = (catalogState.currentPage - 1) * catalogState.itemsPerPage;
  const end = start + catalogState.itemsPerPage;
  return catalogState.currentProducts.slice(start, end);
}

function updateResultsInfo() {
  const { resultsInfo } = catalogState.elements;
  if (!resultsInfo) return;

  const start = (catalogState.currentPage - 1) * catalogState.itemsPerPage + 1;
  const end = Math.min(
    catalogState.currentPage * catalogState.itemsPerPage,
    catalogState.currentProducts.length
  );

  resultsInfo.textContent = `Showing ${start}–${end} of ${catalogState.currentProducts.length} results`;
}

function onPageClick(event) {
  const pageNumber = Number(event.target.textContent);
  if (!Number.isNaN(pageNumber)) {
    catalogState.currentPage = pageNumber;
    updateCatalogPage();
  }
}

function renderPaginationButtons() {
  const { paginationWrapper, prevBtn, nextBtn } = catalogState.elements;
  if (!paginationWrapper || !prevBtn || !nextBtn) return;

  const totalPages = Math.ceil(
    catalogState.currentProducts.length / catalogState.itemsPerPage
  );

  paginationWrapper.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement("span");
    page.classList.add("page");
    if (i === catalogState.currentPage) page.classList.add("active");

    page.textContent = String(i);
    page.addEventListener("click", onPageClick);

    paginationWrapper.appendChild(page);
  }

  prevBtn.disabled = catalogState.currentPage === 1;
  nextBtn.disabled =
    catalogState.currentPage === totalPages || totalPages === 0;
}

function onPrevClick() {
  if (catalogState.currentPage > 1) {
    catalogState.currentPage -= 1;
    updateCatalogPage();
  }
}

function onNextClick() {
  const totalPages = Math.ceil(
    catalogState.currentProducts.length / catalogState.itemsPerPage
  );
  if (catalogState.currentPage < totalPages) {
    catalogState.currentPage += 1;
    updateCatalogPage();
  }
}

function initPaginationControls() {
  const { prevBtn, nextBtn } = catalogState.elements;
  if (prevBtn) {
    prevBtn.addEventListener("click", onPrevClick);
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", onNextClick);
  }
}

function updateCatalogPage() {
  const productsToRender = getPaginatedProducts();
  renderCatalog(productsToRender);
  updateResultsInfo();
  renderPaginationButtons();
}

function onSortChange(event) {
  sortProducts(event.target.value);
}

async function loadCatalog() {
  try {
    const response = await fetch("/src/assets/data.json");
    const data = await response.json();

    catalogState.allProducts = data.data || [];

    catalogState.currentProducts = catalogState.allProducts.filter(
      (p) => !p.blocks.includes("Set")
    );
    catalogState.topBestProducts = catalogState.allProducts.filter((p) =>
      p.blocks.includes("Set")
    );

    initCatalogElements();

    const { sortSelect } = catalogState.elements;
    if (sortSelect) {
      sortSelect.addEventListener("change", onSortChange);
    }

    updateCatalogPage();
    renderTopBest(catalogState.topBestProducts);
    initFilterDropdowns();
    initSalesFilter();
    initClearFilters();
    initPaginationControls();
  } catch (error) {
    console.error("error load", error);
  }
}

function handleAddToCart(card) {
  if (!card) return;

  const nameEl = card.querySelector("h3");
  const priceEl = card.querySelector(".price");
  const imgEl = card.querySelector("img");

  if (!nameEl || !priceEl || !imgEl) {
    console.error("Missing elements in card", card);
    return;
  }

  const product = {
    name: nameEl.textContent.trim(),
    price: parseFloat(priceEl.textContent.replace("$", "")),
    imageUrl: imgEl.src,
    quantity: 1,
  };

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

function onDocumentClick(e) {
  const target = e.target;

  if (target.classList.contains("add-to-cart")) {
    const card = target.closest(".catalogProduct-card");
    handleAddToCart(card);
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badge = document.getElementById("cartCount");

  if (!badge) return;

  if (count > 0) {
    badge.textContent = count;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCatalog();
  updateCartCount();
  document.addEventListener("click", onDocumentClick);
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchModal = document.getElementById("searchModal");
const closeSearchModal = document.getElementById("closeSearchModal");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    runSearch();
  });
}

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
  });
}

async function runSearch() {
  if (!searchInput || !searchModal) return;

  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  try {
    const response = await fetch("/src/assets/data.json");
    const data = await response.json();
    const products = data.data || [];

    const product = products.find(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.size.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
    );

    if (product) {
      sessionStorage.setItem("selectedProductId", product.id);

      if (typeof loadProductPage === "function") {
        // loadProductPage();
      }

      return;
    }

    searchModal.classList.remove("hidden");
  } catch (err) {
    console.error("Search error:", err);
  }
}

if (closeSearchModal && searchModal) {
  closeSearchModal.addEventListener("click", () => {
    searchModal.classList.add("hidden");
  });
}
