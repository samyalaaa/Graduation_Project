document.addEventListener("DOMContentLoaded", () => {
  // Handle dropdown interactions
  const dropdowns = document.querySelectorAll(".dropdown-container")

  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".product-dropdown")

    select.addEventListener("click", (e) => {
      e.preventDefault()

      // Close other dropdowns
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove("expanded")
        }
      })

      // Toggle current dropdown
      dropdown.classList.toggle("expanded")
    })

    // Handle option selection
    const options = dropdown.querySelectorAll(".option")
    options.forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.textContent
        select.value = value
        dropdown.classList.remove("expanded")

        // Update the display text
        const optionElements = Array.from(select.options)
        const matchingOption = optionElements.find((opt) => opt.textContent === value)
        if (matchingOption) {
          matchingOption.selected = true
        }
      })
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-container")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("expanded")
      })
    }
  })

  // Handle category button interactions
  const categoryButtons = document.querySelectorAll(".category-btn")
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      // You can add more functionality here, like filtering content
      console.log("Selected category:", this.textContent)
    })
  })
})

// Add some interactive animations
function addInteractiveEffects() {
  const style = document.createElement("style")
  style.textContent = `
        .category-btn.active {
            background: #2c7a7b !important;
            color: white !important;
            transform: scale(1.05);
        }
    `
  document.head.appendChild(style)
}

// Initialize interactive effects
addInteractiveEffects()


function lense(){
    location.href = "./Lense/lense.html";
}
function chamber(){
    location.href = "./Chmber/chambr.html";
}