window.addEventListener('DOMContentLoaded', function() {
    var newsListElement = document.getElementById('news-list')
  
    // Fetch the news list data
    fetch('data.json').then(function(response) {
        return response.json()
    }).then(function(newsData) {
        var sortedKeys = Object.keys(newsData).sort(function(a, b) {
            return parseInt(b) - parseInt(a)
        })

        var latest_id = sortedKeys[0]
        var latestNewsItem = newsData[latest_id]

        var latestNewsItemElement = document.createElement('a')
        latestNewsItemElement.href = 'detail/' + latest_id + '/index.html'

        var latestNewsItemDescription = document.createElement('p')
        latestNewsItemDescription.textContent = latestNewsItem.author + ' - ' + latestNewsItem.date

        var latestNewsItemImage = document.createElement('img')
        latestNewsItemImage.src = latestNewsItem.image

        var latestNewsLatest = document.getElementById('latest-news')

        var latestNewsItemContent = document.createElement('div')

        var latestNewsItemTitle = document.createElement('h2')
        latestNewsItemTitle.textContent = '#' + latest_id + ' - ' + latestNewsItem.title
        latestNewsItemTitle.id = 'latest-title'

        latestNewsItemImage.id = 'latest-image'

        latestNewsItemContent.appendChild(latestNewsItemTitle)
        latestNewsItemContent.appendChild(latestNewsItemDescription)
        latestNewsItemElement.appendChild(latestNewsItemContent)
        latestNewsItemElement.appendChild(latestNewsItemImage)
        latestNewsLatest.appendChild(latestNewsItemElement)

        for (var i = 0; i < sortedKeys.length; i++) {
            var id = sortedKeys[i]
            var newsItem = newsData[id]

            var newsItemElement = document.createElement('a')
            newsItemElement.href = 'detail/' + id + '/index.html'

            var newsItemDescription = document.createElement('p')
            newsItemDescription.textContent = newsItem.author + ' - ' + newsItem.date

            var newsItemImage = document.createElement('img')
            newsItemImage.src = newsItem.image

            newsItemElement.classList.add('news-item')
        
            var newsItemContent = document.createElement('div')
            newsItemContent.classList.add('news-content')
        
            var newsItemTitle = document.createElement('h3')
            newsItemTitle.textContent = '#' + id + ' - ' + newsItem.title
        
            newsItemContent.appendChild(newsItemTitle)
            newsItemContent.appendChild(newsItemDescription)
            newsItemElement.appendChild(newsItemImage)
            newsItemElement.appendChild(newsItemContent)
            newsListElement.appendChild(newsItemElement)
        }
    }).catch(function(error) {
        console.error('Error loading news list:', error)
    })
})