

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3299,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 799,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Denim Jacket",
        category: "fashion",
        price: 1899,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "shoes",
        price: 2799,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "Casual Sneakers",
        category: "shoes",
        price: 2199,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "Leather Backpack",
        category: "accessories",
        price: 1599,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "accessories",
        price: 999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    }

];




let cart = [];




const productGrid = document.getElementById("productGrid");

const cartCount = document.getElementById("cartCount");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartSidebar = document.getElementById("cartSidebar");

const cartOverlay = document.getElementById("cartOverlay");



function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>

            </div>
        `;

        productGrid.appendChild(card);

    });

}




function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    const existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    openCart();

}




function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartCount.textContent = "0";

        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;

    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price.toLocaleString("en-IN")}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>
        `;

        cartItems.appendChild(div);

    });

    cartCount.textContent = count;

    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

}




function changeQuantity(id, change) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== id
        );

    }

    updateCart();

}




function removeFromCart(id) {

    cart = cart.filter(
        product => product.id !== id
    );

    updateCart();

}


T

function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

}



function closeCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}


document.getElementById("cartBtn")
    .addEventListener("click", openCart);

document.getElementById("closeCart")
    .addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);




const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");


searchBtn.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    searchInput.focus();

});


searchInput.addEventListener("input", () => {

    const keyword =
        searchInput.value.toLowerCase();

    const filtered =
        products.filter(product =>
            product.name.toLowerCase()
                .includes(keyword)
        );

    displayProducts(filtered);

});




document.querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;

            if (category === "all") {

                displayProducts(products);

            } else {

                const filtered =
                    products.filter(
                        product =>
                            product.category === category
                    );

                displayProducts(filtered);

            }

            document.getElementById("products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });




document.getElementById("sortProducts")
    .addEventListener("change", function () {

        let sorted =
            [...products];

        if (this.value === "low") {

            sorted.sort(
                (a, b) => a.price - b.price
            );

        }

        if (this.value === "high") {

            sorted.sort(
                (a, b) => b.price - a.price
            );

        }

        if (this.value === "rating") {

            sorted.sort(
                (a, b) => b.rating - a.rating
            );

        }

        displayProducts(sorted);

    });




const checkoutModal =
    document.getElementById("checkoutModal");

document.getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        checkoutModal.classList.add("active");

    });


document.getElementById("closeModal")
    .addEventListener("click", () => {

        checkoutModal.classList.remove("active");

    });




document.getElementById("checkoutForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        alert(
            "🎉 Order placed successfully!"
        );

        cart = [];

        updateCart();

        checkoutModal.classList.remove("active");

        closeCart();

        this.reset();

    });




displayProducts(products);