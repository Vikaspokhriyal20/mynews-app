const api_key ="086669cd7f2c45bcbdb645bc7dfb99ee";
const url = "https://newsapi.org/v2/everything?q=";


//when window is load then fecthNews() function will be run 
window.addEventListener('load', () => fetchNews("apple"));


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data = await res.json();
    console.log(data);
    binddata(data.articles);
}

function binddata(articles) {
    const cardContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news');
    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
        
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-description');
    const newsSource = cardClone.querySelector('#news-source');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone:'Asia/jakarta'
    });

    newsSource.innerHTML = `${article.source.name} 📅 ${date} `;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });

}
  
let currentItem = null;

function onNavitem(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentItem?.classList.remove('active');
    currentItem = navItem;
    currentItem.classList.add('active'); 
}

const searchBtn = document.getElementById('search-btn');
const inputtext = document.getElementById('input-text');

searchBtn.addEventListener('click', () => {
    const searchQuery = inputtext.value;
    if (!searchQuery) return;
    fetchNews(searchQuery);
    currentItem?.classList.remove('active');
    currentItem = null;
});








