import { create, read, update, remove } from "./firebase.js"

const audioImage = document.getElementById("youtube-img");
const audioTitle = document.getElementById("youtube-title");
const audio_tag = document.getElementById("youtube-audio");
const contentElement = document.getElementById("music-list");
const musicFormTitle = document.getElementById("music-title");
const musicFormUrl = document.getElementById("music-url");
const musicCreateBtn = document.querySelectorAll("#add-page form button")[2];

audio_tag.volume = 0.2;

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
            loadThumbnail(item.url);
            loadTitle(item.title);
            loadAudio(item.url);
        });

        contentElement.appendChild(musicElement);
    });
}

async function loadAudio(videoID) {
    var audio_streams = {};
    await fetch("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent("https://www.youtube.com/watch?hl=en&v=" + videoID)).then(response => {
        if (response.ok) {
            response.text().then(data => {
                data = data.split("window.getPageData")[0];
                data = data.replace("ytInitialPlayerResponse = null", "");
                data = data.replace("ytInitialPlayerResponse=window.ytInitialPlayerResponse", "");
                data = data.replace("ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};", "");

                var regex = /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu;
                const matches = regex.exec(data);
                data = matches && matches.length > 1 ? JSON.parse(matches[1]) : false;

                console.log(data);

                var streams = [];

                if (data.streamingData) {
                    if (data.streamingData.adaptiveFormats) streams = streams.concat(data.streamingData.adaptiveFormats);
                    if (data.streamingData.formats) streams = streams.concat(data.streamingData.formats);
                } else return;

                console.log(streams);

                streams.forEach((stream) => {
                    var itag = stream.itag * 1
                    var quality = false;
                    switch (itag) {
                        case 139:
                            quality = "48kbps";
                            break;
                        case 140:
                            quality = "128kbps";
                            alert("")
                            break;
                        case 141:
                            quality = "256kbps";
                            break;
                    }
                    if (quality) audio_streams[quality] = stream.url;
                });

                audio_tag.src = audio_streams["256kbps"] || audio_streams["128kbps"] || audio_streams["48kbps"];
                audio_tag.play();
            })
        }
    });
}

async function loadThumbnail(videoID) {
    audioImage.src = `https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`;
}

function loadTitle(title) {
    audioTitle.textContent = title;
}

function getVideoID(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else return false;
}

musicCreateBtn.addEventListener("click", async () => {
    event.preventDefault();
    
    const videoID = getVideoID(musicFormUrl.value);

    const result = await create("music", {
        title: musicFormTitle.value,
        url: videoID
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