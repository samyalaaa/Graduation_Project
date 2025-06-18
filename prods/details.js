// details.js
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على معلمة id من URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // جلب قائمة المنتجات من localStorage
    const products = JSON.parse(localStorage.getItem('productsList'));

    // العثور على المنتج المطلوب
    const product = products.find(item => item.id === productId);

    if (product) {
        // تحديث عناصر الصفحة ببيانات المنتج
        document.querySelector('.product-title').textContent = product.title;
        document.querySelector('.sale-price').textContent = `LE ${product.price.toFixed(2)}`;
        document.querySelector('.original-price').textContent = product.oldprice > 0 ? `LE ${product.oldprice.toFixed(2)}` : '';
        document.getElementById('mainImage').src = product.image;

        // إخفاء قسم العرض إذا لم يكن هناك سعر قديم
        if (product.oldprice <= 0) {
            document.querySelector('.original-price').style.display = 'none';
            document.querySelector('.offer-badge').style.display = 'none';
        }
    }

    // دالة لتغيير الصورة الرئيسية عند النقر على الثمبنييل
    window.changeImage = function(newImageSrc, element) {
        document.getElementById('mainImage').src = newImageSrc;
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        element.classList.add('active');
    };

    // دالة لإضافة المنتج إلى السلة
    window.addToCart = function() {
        const quantity = parseInt(document.getElementById('quantity').textContent);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert("product added to cart successfully!");
    };

    // دوال للتحكم في الكمية
    window.increaseQuantity = function() {
        const quantityElement = document.getElementById('quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
    };

    window.decreaseQuantity = function() {
        const quantityElement = document.getElementById('quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
        }
    };

    // دالة للشراء المباشر
    window.buyNow = function() {
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // توجيه المستخدم إلى صفحة الشراء الفوري مع معرّف المنتج والكمية
    window.location.href = `buy-now.html?id=${productId}&quantity=${quantity}`;
};
});