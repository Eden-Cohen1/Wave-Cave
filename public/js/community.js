"use strict";

const article = document.querySelector(".card");
const articleContainer = document.querySelector(".articles");

function addArticle(articles) {
  for (let i = 0; i < articles; i++) {
    articleContainer.appendChild(article.cloneNode(true));
  }
}

addArticle(15);
