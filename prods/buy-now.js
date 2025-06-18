document.addEventListener('DOMContentLoaded', function() {
    // الحصول على معلمة `id` من URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const quantity = parseInt(urlParams.get('quantity')) || 1; // الكمية الافتراضية: 1

    // جلب المنتج من localStorage أو من مصفوفة `products`
    const products = JSON.parse(localStorage.getItem('productsList'));
    const product = products.find(item => item.id === productId);

    if (product) {
        // عرض تفاصيل المنتج في الصفحة
        const buyNowContainer = document.getElementById('buy-now-container');
        buyNowContainer.innerHTML = `
            <div class="product-details">
                <img src="${product.image}" alt="${product.title}" width="200">
                <h2>${product.title}</h2>
                <p>Price: LE ${product.price.toFixed(2)}</p>
                <p>Quantity: ${quantity}</p>
                <p>Total: LE ${(product.price * quantity).toFixed(2)}</p>
            </div>
            <form id="checkout-form">
                <h3>Shipping Information</h3>
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email" required>
                <input type="text" placeholder="Address" required>
                <button type="submit" class="btn-buy-now">Complete Purchase</button>
            </form>
        `;

        // معالجة إرسال النموذج
        document.getElementById('checkout-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your purchase! Your order has been placed.');
            localStorage.removeItem('cart'); // تفريغ السلة بعد الشراء (اختياري)
            window.location.href = 'cart.html'; // إعادة التوجيه إلى الصفحة الرئيسية
        });
    } else {
        document.getElementById('buy-now-container').innerHTML = '<p>Product not found.</p>';
    }
});