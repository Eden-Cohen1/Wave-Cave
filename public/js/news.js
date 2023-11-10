"use strict";
const apikey = "8f3d871e412accdfc7429cedc1db13ba";
export async function fetchArticles() {
  const from = getOneMonthAgo();
  const to = getTo();
  const url = `https://gnews.io/api/v4/search?q=surfing waves&lang=en&country=us&max=10&from=${from}&to=${to}&apikey=${apikey}`;
  return await fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const { articles } = data;
      console.log(getOneMonthAgo());
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

function getOneMonthAgo() {
  const currentDate = new Date();
  currentDate.setUTCMonth(currentDate.getUTCMonth() - 5);

  // Format the date as "YYYY-MM-DDThh:mm:ssZ"
  const formattedDate = currentDate.toISOString().slice(0, 19) + "Z";

  return formattedDate;
}

function getTo() {
  const currentDate = new Date();
  // Format the date as "YYYY-MM-DDThh:mm:ssZ"
  const formattedDate = currentDate.toISOString().slice(0, 19) + "Z";

  return formattedDate;
}
