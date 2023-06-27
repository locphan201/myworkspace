fetch('https://myworkspace.locphan201.repl.co/1/videos')
    .then(response => response.json())
    .then(data => {
        var sortedKeys = Object.keys(data).sort(function(a, b) {
            return parseInt(b) - parseInt(a);
        });

        var latestVideoID = sortedKeys[0]
        setCurrentVideo(latestVideoID)

        var videoListElement = document.getElementById('video-list');
        var videoList = ''
        for (var i = 0; i < sortedKeys.length; i++) {
            var id = sortedKeys[i];
            if (i == 0) {
                videoList += '<div onclick="myFunction(this)" data-id="' + id + '" class="video-item select">'
            } else {
                videoList += '<div onclick="myFunction(this)" data-id="' + id + '" class="video-item">'
            }
            videoList += '<img src="Images/thumbnails.png">';
            videoList += '<div class="video-content">'
            videoList += '<h3>'+ data[id].title + '</h3>'
            videoList += '<p>' + data[id].description + '</p></div></div>'
        }
        videoListElement.innerHTML = videoList 
    })
    .catch(error => {
        console.error('Error:', error);
    });

function setCurrentVideo(id) {
    fetch(`https://myworkspace.locphan201.repl.co/1/videos/${id}`)
      .then(response => response.json())
      .then(data => {
        var currentVideoTitle = document.getElementById('latest-title');
        currentVideoTitle.textContent = data.title
        var currentVideoDesc = document.getElementById('current-video-desc')
        currentVideoDesc.textContent = data.description
        var embeddedVideo = document.getElementById('video')
        embeddedVideo.src = 'https://www.youtube.com/embed/' + data.video
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

function myFunction(element) {
    var id = element.getAttribute("data-id");
    setCurrentVideo(id)

    var video = document.getElementsByClassName('video-item select')[0]
    video.className = 'video-item'
    element.className = 'video-item select'
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
