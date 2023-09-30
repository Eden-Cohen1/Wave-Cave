"use strict";
import {Post, Comment} from './post.js'
import {User} from './user.js'

const postForm = document.querySelector(".create-post");

const article = document.querySelector(".card");
const articleContainer = document.querySelector(".articles");
const feedContainer = document.querySelector('.feeds');
const feedHtml = document.querySelector('.feed');
const previewContainer = document.querySelector(".img-preview")
let currPostImgSrc = "";
console.log(feedHtml); 
function addArticle(articles) {
  for (let i = 0; i < articles; i++) {
    articleContainer.appendChild(article.cloneNode(true));
  }
}

addArticle(3);

const inputImg = document.querySelector("#inputImg");
inputImg.addEventListener('change', previewFile);
function previewFile() {
  const preview = document.querySelector('#previewImg');
  previewContainer.classList.remove('hidden')
  const file    = document.querySelector('input[type=file]').files[0];
  console.log(file);
  const reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    currPostImgSrc = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

const currentUser = new User("Eden Cohen", 26, "Israel")
postForm.addEventListener('submit', function(e){
  e.preventDefault();
  previewContainer.classList.add('hidden');
  const time = new Date().toLocaleString();
  const text = document.querySelector('#create-post');
  const postBody = text.value;
  text.value = "";
  const post = new Post(currentUser, postBody, time, currPostImgSrc)
  const postHtml = post.generateHtml();
  feedContainer.insertAdjacentHTML('afterbegin', postHtml)
  //write post to data base
})

function loadPost(){
  //get post list from data base
  //post.generateHtml
  //feedContanier.insert(afterstart)
}






