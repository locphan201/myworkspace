import { create, read, update, remove } from "./firebase.js"

const ytplayer = document.getElementById("youtube-player");
const contentElement = document.getElementById("music-list");
const musicFormTitle = document.getElementById("music-title");
const musicFormUrl = document.getElementById("music-url");
const musicCreateBtn = document.querySelectorAll("#add-page form button")[2];

var musicList = {};

async function getMusic() {
    const musicData = await read("music");

    if (musicData == null) {
        return {};
    }

    musicList = musicData
}

async function loadMusicSounds() {
    contentElement.innerHTML = "";

    const sortedMusic = Object.entries(musicList)
        .sort(([, a], [, b]) => a.title - b.title)
        .map(([key, value]) => ({ id: key, ...value }));
    
    sortedMusic.forEach(item => {
        const musicElement = document.createElement("div");
        musicElement.className = "music-item";
        const musicTitle = document.createElement("h3");
        musicTitle.className = "music-title";
        musicTitle.textContent = item.title;

        musicElement.appendChild(musicTitle);

        musicElement.addEventListener("click", () => {
            ytplayer.src = item.url
        });

        contentElement.appendChild(musicElement);
    });
}

musicCreateBtn.addEventListener("click", async () => {
    event.preventDefault();

    const result = await create("music", {
        title: musicFormTitle.value,
        url: musicFormUrl.value
    });

    if (result == false) {
        alert("Cannot create new sound!");
        return;
    }

    musicList[result] = {
        title: musicFormTitle.value,
        date: musicFormUrl.value
    } 
    loadMusicSounds();
    musicFormTitle.value = "";
    musicFormUrl.value = "";
    alert("Successfully creating new event!");
});

await getMusic();
loadMusicSounds();