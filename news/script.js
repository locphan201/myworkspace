window.addEventListener('DOMContentLoaded', function() {
    var newsListElement = document.getElementById('news-list')
  
    // Fetch the news list data
    fetch('data.json').then(function(response) {
        return response.json()
    }).then(function(newsData) {
        var sortedKeys = Object.keys(newsData).sort(function(a, b) {
            return parseInt(b) - parseInt(a)
        })
        console.log(newsData)

        for (var i = 0; i < sortedKeys.length; i++) {
            var id = sortedKeys[i]
            var newsItem = newsData[id]

            var newsItemElement = document.createElement('a')
            newsItemElement.href = 'detail/' + id + '/index.html'

            var newsItemDescription = document.createElement('p')
            newsItemDescription.textContent = newsItem.author + ' - ' + newsItem.date

            var newsItemImage = document.createElement('img')
            newsItemImage.src = newsItem.image

            if (i == 0) {
                var newsLatest = document.getElementById('latest-news')

                var newsItemContent = document.createElement('div')

                var newsItemTitle = document.createElement('h2')
                newsItemTitle.textContent = '#' + id + ' - ' +newsItem.title
                newsItemTitle.id = 'latest-title'

                newsItemImage.id = 'latest-image'

                newsItemContent.appendChild(newsItemTitle)
                newsItemContent.appendChild(newsItemDescription)
                newsItemElement.appendChild(newsItemContent)
                newsItemElement.appendChild(newsItemImage)
                newsLatest.appendChild(newsItemElement)

            } else {
                newsItemElement.classList.add('news-item')
        
                var newsItemContent = document.createElement('div')
                newsItemContent.classList.add('news-content')
        
                var newsItemTitle = document.createElement('h3')
                newsItemTitle.textContent = newsItem.title
        
                newsItemContent.appendChild(newsItemTitle)
                newsItemContent.appendChild(newsItemDescription)
                newsItemElement.appendChild(newsItemImage)
                newsItemElement.appendChild(newsItemContent)
                newsListElement.appendChild(newsItemElement)
            }
        }
    }).catch(function(error) {
        console.error('Error loading news list:', error)
    })
})