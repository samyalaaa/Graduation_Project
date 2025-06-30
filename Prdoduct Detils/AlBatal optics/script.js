document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
            mainImage.src = thumbnail.src;
            mainImage.alt = thumbnail.alt;
        });
    });
});

const products = [
    { id: 1, title: "Marco Philip", price: 1800.00, image: "../../images/Rectangle 88(7).png" },
    { id: 2, title: "Computer Glass", price: 345.00, image: "../../images/Rectangle 89(7).png" },
    { id: 3, title: "Damaai Sport", price: 550.00, image: "../../images/Rectangle 90(7).png" }
];

const productsContainer = document.getElementById("products");
const cartIcon = document.getElementById("cart-icon");
const cartContainer = document.getElementById("cart-container");
const closeCart = document.getElementById("close-cart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");

let cart = [];

function displayProducts() {
    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <div class="product-content" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">LE ${product.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="product-info">
                <button class="add-to-cart" data-id="${product.id}">+</button>
            </div>
        `;
        productsContainer.appendChild(productElement);

        const addToCartBtn = productElement.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(e);
        });

        const productContent = productElement.querySelector(".product-content");
        productContent.addEventListener("click", () => {
            navigateToProductDetails(product.id);
        });
    });
}

function navigateToProductDetails(productId) {
    window.location.href = `../../prods/details.html?id=${productId}`;
}

function setupEventListeners() {
    cartIcon.addEventListener("click", () => {
        cartContainer.classList.add("active");
        overlay.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cartContainer.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        cartContainer.classList.remove("active");
        overlay.classList.remove("active");
    });
}

function addToCart(event) {
    const productId = Number.parseInt(event.target.dataset.id);
    const product = products.find((product) => product.id === productId);

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 });
    }

    saveCart();
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
        totalPrice.textContent = "Total: LE 0.00";
        return;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.title}</h3>
                <div class="cart-item-price">LE ${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", decreaseQuantity);
    });

    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", removeItem);
    });

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPrice.textContent = `Total: LE ${total.toFixed(2)}`;
}

function decreaseQuantity(event) {
    const productId = Number.parseInt(event.target.dataset.id);
    const item = cart.find((item) => item.id === productId);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter((item) => item.id !== productId);
    }

    saveCart();
    updateCart();
}

function increaseQuantity(event) {
    const productId = Number.parseInt(event.target.dataset.id);
    const item = cart.find((item) => item.id === productId);
    item.quantity++;

    saveCart();
    updateCart();
}

function removeItem(event) {
    const productId = Number.parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productId);

    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function init() {
    localStorage.removeItem("cart");  // ✅ يمسح السلة عند كل تحميل للصفحة
    cart = [];

    displayProducts();
    setupEventListeners();
    updateCart();
    localStorage.setItem("productsList", JSON.stringify(products));
}

init();
