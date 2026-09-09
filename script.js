
// ===============================
// ReuseHub - script.js
// ===============================

// Sticky Navbar Shadow
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
    } else {
        header.style.boxShadow = "none";
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Search Button
const searchBtn = document.querySelector(".search-section button");
const searchInput = document.querySelector(".search-section input");

if(searchBtn){

    searchBtn.addEventListener("click", ()=>{

        let keyword = searchInput.value.trim();

        if(keyword===""){
            alert("Please enter a product name.");
        }else{
            alert("Searching for: " + keyword);
        }

    });

}

// Add To Cart
const cartButtons = document.querySelectorAll(".product button");

cartButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        alert("✅ Product added to cart!");

    });

});

// Fade Animation
const cards = document.querySelectorAll(".card,.product");

window.addEventListener("scroll",()=>{

    cards.forEach(card=>{

        let position = card.getBoundingClientRect().top;

        let screen = window.innerHeight;

        if(position < screen-100){

            card.style.opacity="1";
            card.style.transform="translateY(0)";
        }

    });

});



function addToCart(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        name: name,
        price: price,
        image: image
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart!");
}

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<h2>Your cart is empty 🛒</h2>";
        cartTotal.innerText = "0";
        return;
    }

    cart.forEach((product, index) => {

        total += product.price;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${product.image}" width="120">

                <div>
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    cartTotal.innerText = total;
}


function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function clearCart() {

    localStorage.removeItem("cart");

    displayCart();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = document.getElementById("cart-count");

    if (count) {
        count.innerText = cart.length;
    }
}

updateCartCount();


function searchProducts() {
    const input = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card");

    const value = input.value.toLowerCase().trim();

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

function homeSearchProducts() {
    let searchText = document.getElementById("homeSearch").value.trim();

    if (searchText !== "") {
        window.location.href = "products.html?search=" + encodeURIComponent(searchText);
    }
}

window.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const searchText = params.get("search");

    if (searchText) {

        const cards = document.querySelectorAll(".card");

        cards.forEach(function (card) {

            const productText = card.innerText.toLowerCase();

            if (productText.includes(searchText.toLowerCase())) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const moreBtn = document.getElementById("moreBtn");
    const moreDropdown = document.getElementById("moreDropdown");

    if (moreBtn && moreDropdown) {

        moreBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            moreDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function () {
            moreDropdown.classList.remove("show");
        });

    }

});

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (user) {

    const welcomeToast = document.getElementById("welcomeToast");

    if (welcomeToast) {
        welcomeToast.textContent = "👋 Welcome, " + user.name + "!";
        welcomeToast.style.display = "block";

        setTimeout(() => {
            welcomeToast.style.display = "none";
        }, 3000);
    }

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.style.display = "inline-block";

        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html";
        });
    }
}