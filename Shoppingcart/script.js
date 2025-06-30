document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const subtotalSpan = document.getElementById("subtotal");
  const finalTotalSpan = document.getElementById("final-total");
  const searchInput = document.getElementById("search-input");
  const clearCartBtn = document.getElementById("clear-cart-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCartItems() {
    renderFilteredCartItems(cart);
  }

  function renderFilteredCartItems(filteredCart) {
    productList.innerHTML = "";
    let subtotal = 0;

    filteredCart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const productDiv = document.createElement("div");
      productDiv.classList.add("product-row");
      productDiv.innerHTML =
        `<div class="product-name">
          <img src="https://visionhub.runasp.net/Images/${encodeURIComponent(item.pictureUrl)}" alt="${item.name}" style="height:60px;">
          <span>${item.name} × ${item.quantity}</span>
        </div>
        <div class="product-total">
          <span>${itemTotal.toFixed(2)} EGP</span>
          <button class="remove-btn" data-id="${item.id}" title="Remove from cart">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>`;
      productList.appendChild(productDiv);
    });

    subtotalSpan.textContent = `${subtotal.toFixed(2)} EGP`;
    updateFinalTotal(subtotal);
  }

  function updateFinalTotal(subtotal) {
    const shippingValue = parseFloat(document.querySelector('input[name="shipping"]:checked').value);
    const final = subtotal + shippingValue;
    finalTotalSpan.innerHTML = `<strong>${final.toFixed(2)} EGP</strong>`;
  }

  document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const currentSubtotal = parseFloat(subtotalSpan.textContent);
      updateFinalTotal(currentSubtotal);
    });
  });

  productList.addEventListener("click", async (e) => {
    if (e.target.closest(".remove-btn")) {
      const id = parseInt(e.target.closest(".remove-btn").dataset.id);
      const token = localStorage.getItem("token");

      try {
        await fetch("https://visionhub.runasp.net/api/Cart/RemoveFromCart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ productId: id }),
        });

        cart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      } catch (error) {
        console.error("Error removing item:", error);
      }
    }
  });

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword === "") {
      renderCartItems();
    } else {
      const filteredItems = cart.filter((item) =>
        item.name.toLowerCase().includes(keyword)
      );
      renderFilteredCartItems(filteredItems);
    }
  });

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("https://visionhub.runasp.net/api/Cart/ClearCart", {
          method: "DELETE",
          headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("API error");

        console.log("🗑️ Cart cleared successfully");
      } catch (error) {
        console.warn("⚠️ API failed, clearing local cart only:", error);
      } finally {
        cart = [];
        localStorage.removeItem("cart");
        renderCartItems();
        alert("Cart cleared successfully.");
      }
    });
  }

  renderCartItems();
});

function check() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to proceed with the order.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart.length === 0) {
    alert("Your cart is empty. Please add items before proceeding.");
    return;
  }

  window.location.href = "../checkout/chech.html";
}
