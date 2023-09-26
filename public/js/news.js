"use strict";
const apikey = "8f3d871e412accdfc7429cedc1db13ba";
const url = `https://gnews.io/api/v4/search?q=surfing waves&lang=en&country=us&max=5&apikey=${apikey}`;
export let lastAPIcall;
export function fetchArticles() {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lastAPIcall = new Date();
      const { articles } = data;
      return articles;
    });
}

class Article {
  constructor(title, description, content, url, image) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.url = url;
    this.image = image;
  }
}
export function wrapArticles(articles) {
  const allArticles = [];
  for (let article of articles) {
    const { title, description, content, url, image } = article;
    const newArticle = new Article(title, description, content, url, image);
    allArticles.push(newArticle);
  }
  return allArticles;
}

// module.exports = { fetchArticles, wrapArticles, lastAPIcall };
