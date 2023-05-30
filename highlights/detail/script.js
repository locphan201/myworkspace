window.addEventListener('DOMContentLoaded', () => {
    // Fetch the news detail data

    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('date');

    fetch('../data.json')
      .then(response => response.json())
      .then(newsDetail => {
        const newsTitleElement = document.getElementById('news-title');
        const newsVideoElement = document.getElementById('news-video');
        const newsContentElement = document.getElementById('news-content');
  
        newsDetail = newsDetail[newsId]
        newsTitleElement.textContent = newsDetail.title;
        newsVideoElement.src = newsDetail.video;
        newsContentElement.innerHTML = newsDetail.content;
      })
      .catch(error => console.error('Error loading news detail:', error));
  });
  