const tabIcons = document.querySelectorAll("#navBar span");
const tabs = document.querySelectorAll(".content");

const eventTab = document.querySelector("#add-page #event-btn");
const wishlistTab = document.querySelector("#add-page #wishlist-btn");
const musicTab = document.querySelector("#add-page #music-btn");
const eventForm = document.querySelector("#add-page #event-form");
const wishlistForm = document.querySelector("#add-page #wishlist-form");
const musicForm = document.querySelector("#add-page #music-form");

function removeAllSelected() {
    tabIcons.forEach(element => {
        element.classList.remove("selected");
    });
    tabs.forEach(element => {
        element.classList.remove("show");
    });
}

tabIcons.forEach(element => {
    element.addEventListener("click", () => {
        removeAllSelected();
        if (element.textContent == "home") {
            document.getElementById("title").textContent = "Homepage";
            tabs[0].classList.add("show");
        } else if (element.textContent == "event") {
            document.getElementById("title").textContent = "Events";
            tabs[1].classList.add("show");
        } else if (element.textContent == "add") {
            document.getElementById("title").textContent = "Add";
            tabs[2].classList.add("show");
            return;
        } else if (element.textContent == "favorite") {
            document.getElementById("title").textContent = "Wishlist";
            tabs[3].classList.add("show");
        } else if (element.textContent == "library_music") {
            document.getElementById("title").textContent = "Library";
            tabs[4].classList.add("show");
        }
        element.classList.add("selected");
    });
});

eventTab.addEventListener("click", () => {
    eventTab.classList.add("selected");
    eventForm.style.display = "block";
    wishlistTab.classList.remove("selected");
    wishlistForm.style.display = "none";
    musicTab.classList.remove("selected");
    musicForm.style.display = "none";

    wishlistForm.reset();
    musicForm.reset();
});

wishlistTab.addEventListener("click", () => {
    eventTab.classList.remove("selected");
    eventForm.style.display = "none";
    wishlistTab.classList.add("selected");
    wishlistForm.style.display = "block";
    musicTab.classList.remove("selected");
    musicForm.style.display = "none";

    eventForm.reset();
    musicForm.reset();
});


musicTab.addEventListener("click", () => {
    eventTab.classList.remove("selected");
    eventForm.style.display = "none";
    wishlistTab.classList.remove("selected");
    wishlistForm.style.display = "none";
    musicTab.classList.add("selected");
    musicForm.style.display = "block";

    eventForm.reset();
    wishlistForm.reset();
});