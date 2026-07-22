async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();
  renderGrid(products, "all");

  document.querySelectorAll(".filter-bar button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-bar button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderGrid(products, btn.dataset.filter);
    });
  });
}

function buildCustomOptions(variants) {
  const base = variants[0].price;
  return variants
    .map((v) => {
      const diff = v.price - base;
      if (diff === 0) return v.label;
      const sign = diff > 0 ? "+" : "-";
      return `${v.label}[${sign}${Math.abs(diff).toFixed(2)}]`;
    })
    .join("|");
}

function renderGrid(products, filter) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  const filtered = filter === "all" ? products : products.filter((p) => p.type === filter);

  filtered.forEach((product) => {
    const base = product.variants[0].price;
    const options = buildCustomOptions(product.variants);
    const optionLabel = product.type === "apparel" ? "Size" : "Format";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-body">
        <h3>${product.name}</h3>
        <p class="desc">${product.description}</p>
        <div class="price">From $${base.toFixed(2)}</div>
        <button
          class="add-btn snipcart-add-item"
          data-item-id="${product.id}"
          data-item-price="${base.toFixed(2)}"
          data-item-name="${product.name}"
          data-item-image="${product.image}"
          data-item-url="products.json"
          data-item-description="${product.description}"
          data-item-custom1-name="${optionLabel}"
          data-item-custom1-options="${options}"
        >
          Add to Cart
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);
