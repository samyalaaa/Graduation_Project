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
const productsContainer = document.getElementById("products")
const cartIcon = document.getElementById("cart-icon")
const cartContainer = document.getElementById("cart-container")
const closeCart = document.getElementById("close-cart")
const overlay = document.getElementById("overlay")
const cartItems = document.getElementById("cart-items")
const cartCount = document.getElementById("cart-count")
const totalPrice = document.getElementById("total-price")

// Cart array
let cart = JSON.parse(localStorage.getItem("cart")) || []

// Display products
// Display products
function displayProducts() {
    products.forEach((product) => {
        const productElement = document.createElement("div")
        productElement.classList.add("product")
        productElement.innerHTML = `
            <div class="product-content" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">LE ${product.price.toFixed(2)}</div>
                    <div class="product-oldprice">LE ${product.oldprice.toFixed(2)}</div>
                </div>
            </div>
            <div class="product-info">
                <button class="add-to-cart" data-id="${product.id}">+</button>
            </div>
        `
        productsContainer.appendChild(productElement)

        // Add click event to navigate to product details
        const productContent = productElement.querySelector(".product-content")
        productContent.addEventListener("click", () => {
            navigateToProductDetails(product.id)
        })
    })
}

   // استبدل الدالة المكررة بهذا الكود
function navigateToProductDetails(productId) {
    window.location.href = `details.html?id=${productId}`;
}


// Add event listeners
function setupEventListeners() {
// Add to cart buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
    e.stopPropagation() // Prevent navigation when clicking the add button
    addToCart(e)
    })
})

// Open cart
cartIcon.addEventListener("click", () => {
    cartContainer.classList.add("active")
    overlay.classList.add("active")
})

// Close cart
closeCart.addEventListener("click", () => {
    cartContainer.classList.remove("active")
    overlay.classList.remove("active")
})

// Close cart when clicking on overlay
overlay.addEventListener("click", () => {
    cartContainer.classList.remove("active")
    overlay.classList.remove("active")
})

// Add event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation() // Prevent navigation when clicking the add button
            addToCart(e)
        })
    })

    // Open cart
    cartIcon.addEventListener("click", () => {
        cartContainer.classList.add("active")
        overlay.classList.add("active")
    })

    // Close cart
    closeCart.addEventListener("click", () => {
        cartContainer.classList.remove("active")
        overlay.classList.remove("active")
    })

    // Close cart when clicking on overlay
    overlay.addEventListener("click", () => {
        cartContainer.classList.remove("active")
        overlay.classList.remove("active")
    })
}
}

// Add to cart function
function addToCart(event) {
const productId = Number.parseInt(event.target.dataset.id)
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
cartCount.textContent = totalItems

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

// Initialize
function init() {
displayProducts()
setupEventListeners()
updateCart()
localStorage.setItem("productsList", JSON.stringify(products))

}

// Run initialization
init()
