// Product data
const products = [
{
    id: 1,
    title: "Marco Philip",
    price: 1800.0,
    oldprice: 0.0,
    image: "../images/assets/Rectangle 88.png",
},
{
    id: 2,
    title: "Computer Glass",
    price: 345.0,
    oldprice: 0.0,
    image: "../images/assets/Rectangle 89.png",
},
{
    id: 3,
    title: "Damaai Sport",
    price: 550.0,
    oldprice: 0.0,
    image: "../images/assets/Rectangle 90.png",
},
{
    id: 4,
    title: "ABL Mokka",
    price: 210.0,
    oldprice: 345.0,
    image: "../images/assets/Rectangle 88 (1).png",
},
{
    id: 5,
    title: "ABL Vitara SRT",
    price: 550.0,
    oldprice: 123.0,
    image: "../images/assets/Rectangle 89 (1).png",
},
{
    id: 6,
    title: "ABL Harry Poter",
    price: 433.0,
    oldprice: 777.0,
    image: "../images/assets/Rectangle 90 (1).png",
},
{
    id: 7,
    title: "ABL Mokka",
    price: 555.0,
    oldprice: 755.0,
    image: "../images/assets/Rectangle 88 (2).png",
},
{
    id: 8,
    title: "ABL Rimless Pro",
    price: 666.0,
    oldprice: 987.0,
    image: "../images/assets/Rectangle 89 (2).png",
},
{
    id: 9,
    title: "ABL Emgran",
    price: 966.0,
    oldprice: 223.0,
    image: "../images/assets/Rectangle 90 (2).png",
},
{
    id: 10,
    title: "ABL Duster",
    price: 1250.0,
    oldprice: 349.0,
    image: "../images/assets/Rectangle 88 (3).png",
},
{
    id: 11,
    title: "ABL Optra RS",
    price: 77.0,
    oldprice: 165.0,
    image: "../images/assets/Rectangle 89 (3).png",
},
{
    id: 12,
    title: "ABL Forte GTs",
    price: 25.0,
    oldprice: 75.0,
    image: "../images/assets/Rectangle 90 (3).png",
},
]

// DOM elements
const productDetailsContainer = document.getElementById("product-details")
const backButton = document.getElementById("back-button")
const cartContainer = document.getElementById("cart-container")
const closeCart = document.getElementById("close-cart")
const overlay = document.getElementById("overlay")
const cartItems = document.getElementById("cart-items")
const totalPrice = document.getElementById("total-price")

// Cart array
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Get product ID from URL
function getProductIdFromUrl() {
const urlParams = new URLSearchParams(window.location.search)
return Number.parseInt(urlParams.get("id"))
}

// Display product details
function displayProductDetails() {
const productId = getProductIdFromUrl()
const product = products.find((p) => p.id === productId)

if (!product) {
    productDetailsContainer.innerHTML = "<p>Product not found</p>"
    return
}

// Calculate discount percentage if there's an old price
let discountBadge = ""
if (product.oldprice > 0) {
    const discountPercentage = Math.round(((product.oldprice - product.price) / product.oldprice) * 100)
    discountBadge = `<span class="discount-badge">Save ${discountPercentage}%</span>`
}

// Create product details HTML
productDetailsContainer.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-details-info">
            <h1 class="product-details-title">${product.title}</h1>
            
            <div class="product-details-price-container">
                <span class="product-details-price">LE ${product.price.toFixed(2)}</span>
                ${product.oldprice > 0 ? `<span class="product-details-oldprice">LE ${product.oldprice.toFixed(2)}</span>` : ""}
                ${discountBadge}
            </div>
            
            <div class="product-description">
                <h3>Product Description</h3>
                <p>Premium quality ${product.title} with elegant design and comfortable fit. Perfect for everyday use and special occasions.</p>
            </div>
            
            <button class="add-to-cart-btn" data-id="${product.id}">
                <span class="cart-icon-btn">🛒</span> Add to Cart
            </button>
        </div>
        
        <div class="cart-icon-details" id="cart-icon">
            <i class="fa fa-shopping-cart"></i>
            <span class="cart-count" id="cart-count">0</span>
        </div>
    `

// Add event listener to Add to Cart button
document.querySelector(".add-to-cart-btn").addEventListener("click", () => {
    addToCart(product.id)
})

// Add cart icon event listener
document.getElementById("cart-icon").addEventListener("click", () => {
    cartContainer.classList.add("active")
    overlay.classList.add("active")
})
}

// Add to cart function
function addToCart(productId) {
const product = products.find((product) => product.id === productId)

// Check if product is already in cart
const existingItem = cart.find((item) => item.id === productId)

if (existingItem) {
    existingItem.quantity++
} else {
    cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
    })
}

// Save cart to localStorage
saveCart()

// Update cart display
updateCart()
}

// Update cart display
function updateCart() {
// Clear cart items
cartItems.innerHTML = ""

// Update cart count
const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
document.getElementById("cart-count").textContent = totalItems

// If cart is empty
if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>"
    totalPrice.textContent = "Total: LE 0.00"
    return
}

// Add items to cart
cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.classList.add("cart-item")
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
        `
    cartItems.appendChild(cartItem)
})

// Add event listeners to quantity buttons
document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", decreaseQuantity)
})

document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", increaseQuantity)
})

document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem)
})

// Update total price
const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
totalPrice.textContent = `Total: LE ${total.toFixed(2)}`
}

// Decrease quantity
function decreaseQuantity(event) {
const productId = Number.parseInt(event.target.dataset.id)
const item = cart.find((item) => item.id === productId)

if (item.quantity > 1) {
    item.quantity--
} else {
    // Remove item if quantity is 1
    cart = cart.filter((item) => item.id !== productId)
}

saveCart()
updateCart()
}

// Increase quantity
function increaseQuantity(event) {
const productId = Number.parseInt(event.target.dataset.id)
const item = cart.find((item) => item.id === productId)
item.quantity++

saveCart()
updateCart()
}

// Remove item
function removeItem(event) {
const productId = Number.parseInt(event.target.dataset.id)
cart = cart.filter((item) => item.id !== productId)

saveCart()
updateCart()
}

// Save cart to localStorage
function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart))
}

// Setup event listeners
function setupEventListeners() {
// Back button
backButton.addEventListener("click", () => {
    window.location.href = "cart.html"
})

// Close cart
closeCart.addEventListener("click", () => {
    window.location.href = "cart.html"
})

// Close cart
closeCart.addEventListener("clistener('click", () => {
    cartContainer.classList.remove("active")
    overlay.classList.remove("active")
})

// Close cart when clicking on overlay
overlay.addEventListener("click", () => {
    cartContainer.classList.remove("active")
    overlay.classList.remove("active")
})
}

// Initialize
function init() {
displayProductDetails()
setupEventListeners()
updateCart()
}

// Run initialization
init()
