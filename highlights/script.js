videoData = {
    "20230528-2" : {
        title : "Vòng 6 - P2: Thái Nam bay cao - Sự trở lại của đôi cánh thiên thần",
        image : "Images/thumbnails.png",
        video : "nlIJHbcEnpE",
        description : "Highlights - 28/05/2023 (13 phút)"
    },
    "20230528-1" : {
        title : "Vòng 6 - P1: Thái Nam bay cao - Sự trở lại của đôi cánh thiên thần",
        image : "Images/thumbnails.png",
        video : "_vDxChuWnf8",
        description : "Highlights - 28/05/2023 (12 phút)"
    },
    "20230521" : {
        title : "Vòng 5: Hoàng Phúc toả sáng - Bước chạy của thanh xuân.",
        image : "Images/thumbnails.png",
        video : "ihYgvyCXhn8", 
        description : "Highlights - 21/05/2023 (15 phút)"
    },
    "20230514" : {
        title : "Vòng 4: Sự trở lại của thợ săn ống đồng",
        image : "Images/thumbnails.png",
        video : "HlCE-y48kek", 
        description : "Highlights - 14/05/2023 (13 phút)"
    },
    "20220925" : {
        title : "Mùa 2022 - Tuần 4 Tháng 9",
        image : "Images/thumbnails.png",
        video : "eXDQ_EqXaQk", 
        description : "Highlights - 25/09/2022 (7 phút)"
    },
    "20220918" : {
        title : "Mùa 2022 - Tuần 3 Tháng 9",
        image : "Images/thumbnails.png",
        video : "aVt_LTZNDpw", 
        description : "Highlights - 18/09/2022 (9 phút)"
    }, 
    "20220911" : {
        title : "Mùa 2022 - Tuần 2 Tháng 9",
        image : "Images/thumbnails.png",
        video : "8bKBFnkJiC4", 
        description : "Highlights - 11/09/2022 (12 phút)"
    }
}

function setCurrentVideo(id) {
    var currentVideoTitle = document.getElementById('latest-title');
    currentVideoTitle.textContent = videoData[id].title
    var currentVideoDesc = document.getElementById('current-video-desc')
    currentVideoDesc.textContent = videoData[id].description
    var embeddedVideo = document.getElementById('video')
    embeddedVideo.src = 'https://www.youtube.com/embed/' + videoData[id].video
}

var sortedKeys = Object.keys(videoData).sort(function(a, b) {
    return parseInt(b) - parseInt(a);
});

var latestVideoID = sortedKeys[0]
setCurrentVideo(latestVideoID)

var videoListElement = document.getElementById('video-list');
var videoList = ''
for (var i = 0; i < sortedKeys.length; i++) {
    var id = sortedKeys[i];

    videoList += '<div onclick="myFunction(this)" data-id="' + id + '" class="video-item">'
    videoList += '<img src="' + videoData[id].image + '">';
    videoList += '<div class="video-content">'
    videoList += '<h3>'+ videoData[id].title + '</h3>'
    videoList += '<p>' + videoData[id].description + '</p></div></div>'
}
videoListElement.innerHTML = videoList 

function myFunction(element) {
    var id = element.getAttribute("data-id");
    setCurrentVideo(id)

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}