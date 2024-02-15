import { create, read, update, remove } from "./firebase.js"

const wishlistFormTitle = document.getElementById("wishlist-title");
const wishlistFormType = document.getElementById("wishlist-type");
const wishlistCreateBtn = document.querySelectorAll("#add-page form button")[1];

const tabBtns = document.querySelectorAll("#wishlist-page .btn-grid button");
const eventTab = document.querySelector("#add-page #event-btn");
const wishlistTab = document.querySelector("#add-page #wishlist-btn");
const eventForm = document.querySelector("#add-page #event-form");
const wishlistForm = document.querySelector("#add-page #wishlist-form")

const foodTab = document.getElementById("food-btn");
const placeTab = document.getElementById("place-btn");
const activityTab = document.getElementById("activity-btn");

const foodList = document.getElementById("food-list");
const placeList = document.getElementById("place-list");
const activityList = document.getElementById("activity-list");

const searchInput = document.getElementById("searchInput");


function setupSearch() {
    const foodItems = foodList.querySelectorAll("p");
    const placeItems = placeList.querySelectorAll("p");
    const activityItems = activityList.querySelectorAll("p");

    const allItems = [...foodItems, ...placeItems, ...activityItems];

    searchInput.addEventListener("input", function() {
        const searchTerm = searchInput.value.toLowerCase();

        allItems.forEach(item => {
            const foodItemText = item.textContent.toLowerCase();
            if (foodItemText.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}

async function loadWishlist() {
    const wishes = await read("wishlist");

    if (wishes == null) {
        return;
    }

    Object.keys(wishes).forEach(key => {
        const wishElement = document.createElement("p");
        wishElement.innerHTML = `
            <p>${wishes[key].title}</p>
        `;

        wishElement.addEventListener("click", () => {
            wishlistFormTitle.value = wishes[key].title;
            wishlistFormType.value = wishes[key].type;
            const wishlistIcon = document.querySelectorAll("#navBar span")[3];
            const tabs = document.querySelectorAll(".content");

            wishlistIcon.classList.remove("selected");
            tabs[3].classList.remove("show");
            tabs[2].classList.add("show");

            eventTab.classList.remove("selected");
            eventForm.style.display = "none";
            wishlistTab.classList.add("selected");
            wishlistForm.style.display = "block";
            eventForm.reset();
        });

        if (wishes[key].type == "food") {
            foodList.appendChild(wishElement);
        } else if (wishes[key].type == "place") {
            placeList.appendChild(wishElement);
        } else if (wishes[key].type == "activity") {
            activityList.appendChild(wishElement);
        }
    });   
    setupSearch();
}

wishlistCreateBtn.addEventListener("click", async () => {
    event.preventDefault();
    const wishTitle = wishlistFormTitle.value;
    const wishType = wishlistFormType.value;

    const result = await create("wishlist", {
        title: wishTitle,
        type: wishType
    });

    if (result == false) {
        alert("Cannot create new wish!");
        return;
    }

    const wishElement = document.createElement("p");
    wishElement.innerHTML = `
        <p>${wishlistFormTitle.value}</p>
    `;

    wishElement.addEventListener("click", () => {
        wishlistFormTitle.value = wishTitle;
        wishlistFormType.value = wishType;
        const wishlistIcon = document.querySelectorAll("#navBar span")[3];
        const tabs = document.querySelectorAll(".content");

        wishlistIcon.classList.remove("selected");
        tabs[3].classList.remove("show");
        tabs[2].classList.add("show");

        eventTab.classList.remove("selected");
        eventForm.style.display = "none";
        wishlistTab.classList.add("selected");
        wishlistForm.style.display = "block";
        eventForm.reset();
    });

    if (wishlistFormType.value == "food") {
        foodList.appendChild(wishElement);
    } else if (wishlistFormType.value == "place") {
        placeList.appendChild(wishElement);
    } else if (wishlistFormType.value == "activity") {
        activityList.appendChild(wishElement);
    }

    wishlistFormTitle.value = "";

    alert("Successfully creating new wish!");
});


tabBtns[0].addEventListener("click", () => {
    foodTab.classList.add("selected");
    placeTab.classList.remove("selected");
    activityTab.classList.remove("selected");

    foodList.style.display = "grid";
    placeList.style.display = "none";
    activityList.style.display = "none";
});

tabBtns[1].addEventListener("click", () => {
    foodTab.classList.remove("selected");
    placeTab.classList.add("selected");
    activityTab.classList.remove("selected");

    foodList.style.display = "none";
    placeList.style.display = "grid";
    activityList.style.display = "none";
});

tabBtns[2].addEventListener("click", () => {
    foodTab.classList.remove("selected");
    placeTab.classList.remove("selected");
    activityTab.classList.add("selected");

    foodList.style.display = "none";
    placeList.style.display = "none";
    activityList.style.display = "grid";
});

await loadWishlist();