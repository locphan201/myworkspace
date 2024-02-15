import { create, read, update, remove } from "./firebase.js"

const eventTab = document.querySelector("#add-page #event-btn");
const wishlistTab = document.querySelector("#add-page #wishlist-btn");
const eventForm = document.querySelector("#add-page #event-form");
const wishlistForm = document.querySelector("#add-page #wishlist-form")

const contentElement = document.getElementById("events-page");
const eventFormTitle = document.getElementById("event-title");
const eventFormDate = document.getElementById("event-date");
const eventCreateBtn = document.querySelector("#add-page form button");

const months = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04":"Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08":"Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12":"Dec",
}

var eventList = {};

async function getEvents() {
    const eventsData = await read("events");

    if (eventsData == null) {
        return {};
    }

    eventList = eventsData
}

async function loadEvents() {
    contentElement.innerHTML = "";

    const sortedEvents = Object.entries(eventList)
        .sort(([, a], [, b]) => new Date(a.date) - new Date(b.date))
        .map(([key, value]) => ({ id: key, ...value }));
    
    sortedEvents.forEach(item => {
        const eventElement = document.createElement("div");
        eventElement.className = "event-item";
        const eventTitle = document.createElement("h3");
        eventTitle.className = "event-title";
        eventTitle.textContent = item.title;
        const eventDate = document.createElement("p");
        eventDate.className = "event-date";
        let date = item.date.split("-").reverse();
        date[1] = months[date[1]];
        eventDate.textContent = date.join(" ");

        eventElement.appendChild(eventTitle);
        eventElement.appendChild(eventDate);

        eventElement.addEventListener("click", () => {
            eventFormTitle.value = item.title;
            eventFormDate.value = item.date;
            const eventIcon = document.querySelectorAll("#navBar span")[1];
            const tabs = document.querySelectorAll(".content");

            eventIcon.classList.remove("selected");
            tabs[1].classList.remove("show");
            tabs[2].classList.add("show");

            eventTab.classList.add("selected");
            eventForm.style.display = "block";
            wishlistTab.classList.remove("selected");
            wishlistForm.style.display = "none";
            wishlistForm.reset();
        });

        contentElement.appendChild(eventElement);
    });
}

eventCreateBtn.addEventListener("click", async () => {
    event.preventDefault();
    const result = await create("events", {
        title: eventFormTitle.value,
        date: eventFormDate.value
    });

    if (result == false) {
        alert("Cannot create new event!");
        return;
    }

    eventList[result] = {
        title: eventFormTitle.value,
        date: eventFormDate.value
    } 
    loadEvents();
    eventFormTitle.value = "";
    eventFormDate.value = "";
    alert("Successfully creating new event!");
});

await getEvents();
loadEvents();