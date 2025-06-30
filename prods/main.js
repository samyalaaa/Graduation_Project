const productsContainer = document.getElementById("products");

// نخزن أول صورة شغالة نلاقيها
let fallbackImage = null;

// ✅ نختبر إذا كانت الصورة بتشتغل فعلاً
function testImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function fetchProductsFromAPI() {
  try {
    const response = await fetch('https://visionhub.runasp.net/api/Product/GetAll');
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    localStorage.setItem("productsList", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function displayProducts(products) {
  productsContainer.innerHTML = "";

  // ✅ عرض فقط المنتجات بين ID 16 و 24
  products = products.filter(p => p.id >= 16 && p.id <= 24);

  if (products.length === 0) {
    productsContainer.innerHTML = `<p class="text-danger">No products available now.</p>`;
    return;
  }

  for (const product of products) {
    if (!product.pictureUrl || !product.name || product.newPrice === undefined) continue;

    let imageUrl = `https://visionhub.runasp.net/Images/${encodeURIComponent(product.pictureUrl)}`;
    const isImageValid = await testImage(imageUrl);

    if (!isImageValid) {
      if (fallbackImage) {
        imageUrl = fallbackImage;
      } else {
        continue;
      }
    } else {
      if (!fallbackImage) fallbackImage = imageUrl;
    }

    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <div class="product-content" data-id="${product.id}">
        <img src="${imageUrl}" alt="${product.name}" class="img-fluid" style="max-height:200px;">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price">LE ${product.newPrice.toFixed(2)}</div>
          <div class="product-oldprice text-muted"><del>LE ${product.oldPrice?.toFixed(2) || '0.00'}</del></div>
          <button class="add-to-cart btn btn-sm btn-success mt-2" data-id="${product.id}">+</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productElement);
  }

  setupEventListeners(products);
}

function setupEventListeners(products) {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = parseInt(button.dataset.id);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to add items to the cart.");
        return;
      }

      try {
        const response = await fetch("https://visionhub.runasp.net/api/Cart/AddToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: id,
            quantity: 1
          })
        });

        if (!response.ok) throw new Error("Failed to add to cart");

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          const productToAdd = products.find(p => p.id === id);
          cart.push({ ...productToAdd, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount(cart);

      } catch (err) {
        console.error("Error adding to cart:", err);
        alert("Error while adding item to cart.");
      }
    });
  });

  document.querySelectorAll(".product-content").forEach((productContent) => {
    productContent.addEventListener("click", () => {
      const productId = parseInt(productContent.dataset.id);
      navigateToProductDetails(productId);
    });
  });
}

function updateCartCount(cart) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) cartCountElement.textContent = totalItems;
}

function navigateToProductDetails(productId) {
  window.location.href = `details.html?id=${productId}`;
}

// ✅ تشغيل الصفحة
fetchProductsFromAPI().then((products) => {
  displayProducts(products);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount(cart);
});
