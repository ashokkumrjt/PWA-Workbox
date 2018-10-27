const apiKey = 'a05c769d5fd243a884e64c4c7fac32f4';

const apiURL = `https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=${apiKey}`;

window.addEventListener('load', async e => {
    updateArticle();

    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW registration failed');
        }
    }
});

async function updateArticle() {

    const placeHolder = document.querySelector('.dynamic-content');

    const res = await fetch(apiURL);

    const data = await res.json();

    placeHolder.innerHTML = data.articles.map(createArticle);
}

function createArticle(article) {
    return `<div>
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href=${article.url}>
            <img src=${article.urlToImage} />
        </a>
    </div>`
}