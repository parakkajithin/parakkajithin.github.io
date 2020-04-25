const apiKey='d653dab42b7e48a8b599503680f6a626';
const main=document.querySelector('main');
window.addEventListener('load', e=>{
    updateNews();
});

async function updateNews() { 
    const res= await fetch('http://newsapi.org/v2/top-headlines?country=in&apiKey=d653dab42b7e48a8b599503680f6a626');
    const json=await res.json();
    main.innerHTML=json.articles.map(createArticle).join('\n');
 }
if('serviceWorker' in navigator){
    try{
        navigator.serviceWorker.register('sw.js');
        console.log('Service worker registered');
    }
    catch(error){
        console.log('Service worker not registered');
    }
}
 function createArticle(article) { 
     return '\
     <div class="article">\
     <a href="'+article.url+'">\
     <h2>'+article.title+'</h2>\
     <p>'+article.description+'</p>\
     </a>\
     </div>\
     ';
  }