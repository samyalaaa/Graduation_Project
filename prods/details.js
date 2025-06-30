document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const allProducts = JSON.parse(localStorage.getItem("productsList")) || [];

  const product = allProducts.find((item) => item.id === productId);

  if (!product) {
    document.querySelector(".main-content").innerHTML =
      "<h2 class='text-danger'>Product Not Found</h2>";
    return;
  }

  // تعبئة البيانات
  document.querySelector(".product-title").textContent = product.name || product.title || "Product";
  document.querySelector(".sale-price").textContent = `LE ${(
    product.newPrice || product.price || 0
  ).toFixed(2)}`;

  const oldPrice = product.oldPrice || product.oldprice || 0;
  if (oldPrice > 0) {
    document.querySelector(".original-price").textContent = `LE ${oldPrice.toFixed(2)}`;
  } else {
    document.querySelector(".original-price").style.display = "none";
    document.querySelector(".offer-badge").style.display = "none";
  }

  const baseImage = product.pictureUrl
    ? `https://visionhub.runasp.net/Images/${encodeURIComponent(product.pictureUrl)}`
    : (product.image || "");

  const mainImage = document.getElementById("mainImage");
  mainImage.src = baseImage;
  mainImage.onerror = () => (mainImage.src = "../images/fallback.png");

  const thumbnails = document.getElementById("thumbnails");
  const thumbImgs = [
    baseImage,
    "../images/assets/Rectangle 88.png",
    "../images/assets/Rectangle 89.png",
  ];

  thumbnails.innerHTML = thumbImgs
    .map(
      (src, i) =>
        `<div class="thumbnail ${i === 0 ? "active" : ""}" onclick="changeImage('${src}', this)">
          <img src="${src}" alt="Thumbnail ${i + 1}" />
        </div>`
    )
    .join("");

  window.changeImage = function (src, el) {
    document.getElementById("mainImage").src = src;
    document.querySelectorAll(".thumbnail").forEach((t) => t.classList.remove("active"));
    el.classList.add("active");
  };

  window.increaseQuantity = function () {
    const el = document.getElementById("quantity");
    el.textContent = parseInt(el.textContent) + 1;
  };

  window.decreaseQuantity = function () {
    const el = document.getElementById("quantity");
    const qty = parseInt(el.textContent);
    if (qty > 1) el.textContent = qty - 1;
  };

  // ✅ إضافة للسلة مع pictureUrl
  window.addToCart = function () {
    const quantity = parseInt(document.getElementById("quantity").textContent);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name || product.title,
        price: product.newPrice || product.price,
        pictureUrl: product.pictureUrl || product.image,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart successfully!");
  };

  window.buyNow = function () {
    const quantity = parseInt(document.getElementById("quantity").textContent);
    window.location.href = `buy-now.html?id=${productId}&quantity=${quantity}`;
  };
});
