window.addEventListener('DOMContentLoaded', function() {
    fetch('data.json').then(function(response) {
        return response.json()
    }).then(function(newsData) {
        var sortedKeys = Object.keys(newsData).sort(function(a, b) {
            return parseInt(b) - parseInt(a)
        })

        var latest_id = sortedKeys[0]

        var latestNewsLink = document.getElementById('latest-link')
        latestNewsLink.href = 'detail/' + latest_id + '/index.html'

        var latestNewsTitle = document.getElementById('latest-title')
        latestNewsTitle.textContent = '#' + latest_id + ' - ' + newsData[latest_id].title

        var latestNewsDesc = document.getElementById('latest-desc')
        latestNewsDesc.textContent = newsData[latest_id].author + ' - ' + newsData[latest_id].date

        var latestNewsImage = document.getElementById('latest-image')
        latestNewsImage.src = newsData[latest_id].image

        var newsListElement = document.getElementById('news-list')
        var newsList = ''
        for (var i = 0; i < sortedKeys.length; i++) {
            var id = sortedKeys[i]
            newsList += '<a href="detail/' + id + '/index.html" class="news-item">'
            newsList += '<img src="' + newsData[id].image + '"><div class="news-content">'
            newsList += '<h3>#' + id + ' - ' + newsData[id].title + '</h3>'
            newsList += '<p>' + newsData[id].author + ' - ' + newsData[id].date + '</p></div></a>'
        }
        newsListElement.innerHTML = newsList
    }).catch(function(error) {
        console.error('Error loading news list:', error)
    })
})