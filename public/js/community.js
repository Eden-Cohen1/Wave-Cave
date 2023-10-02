"use strict";
import { Post, Comment } from "./post.js";
import { User } from "./user.js";

const postForm = document.querySelector(".create-post");
const signupForm = document.querySelector(".signup__form");
const sidebarNews = document.querySelector("#news");
const sidebarFeed = document.querySelector("#feed");
const btnSignup = document.querySelector(".signup");
const btnLogin = document.querySelector(".login");
const btnCloseModalSU = document.querySelector(
  ".sign-up-modal .btn--close-modal"
);
const btnCloseModalLG = document.querySelector(
  ".login-modal .btn--close-modal"
);
const signupModal = document.querySelector(".sign-up-modal");
const loginModal = document.querySelector(".login-modal");
const modalOverlay = document.querySelector(".overlay-modal");
const article = document.querySelector(".card");
const articleContainer = document.querySelector(".articles");
const feedContainer = document.querySelector(".feeds");
const newsContainer = document.querySelector(".news");
const feedHtml = document.querySelector(".feed");
const previewContainer = document.querySelector(".img-preview");
const menuItems = document.querySelectorAll(".menu-item");
let currPostImgSrc = "";
let currProfileImgSrc = "";
function addArticle(articles) {
  for (let i = 0; i < articles; i++) {
    articleContainer.appendChild(article.cloneNode(true));
  }
}

addArticle(8);
const users = [];

// <=========================== LOGIN MODAL ===========================> //

const openModalLG = function (e) {
  e.preventDefault();
  loginModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

const closeModalLG = function () {
  loginModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};

btnCloseModalLG.addEventListener("click", closeModalLG);
btnLogin.addEventListener("click", openModalLG);

// <=========================== SIGNUP MODAL ===========================> //

const openModalSU = function (e) {
  e.preventDefault();
  signupModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

const closeModalSU = function () {
  signupModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};

btnCloseModalSU.addEventListener("click", closeModalSU);
btnSignup.addEventListener("click", openModalSU);

//SIGNUP DATA//
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = `${document.querySelector(".first-name").value} ${
    document.querySelector(".last-name").value
  }`;
  const country = document.querySelector(".country").value;
  const age = document.querySelector(".age").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  const handle = email.split("@")[0];
  const user = new User(
    name,
    country,
    age,
    email,
    handle,
    password,
    currProfileImgSrc
  );
  //add user to data-base
  users.push(user);
});
//PROFILE PHOTO//
const inputProfileImg = document.querySelector("#inputProfileImg");
inputProfileImg.addEventListener("change", previewProfileImg);
function previewProfileImg() {
  console.log("aaaaaaaaaaaaaaaaaaaa");
  const preview = document.querySelector("#previewProfileImg");
  preview.classList.remove("hidden");
  const file = signupForm.querySelector("input[type=file]").files[0];
  const reader = new FileReader();
  reader.onload = function () {
    preview.src = reader.result;
    preview.classList.remove("hidden");
    console.log("asdasdas");
    currPostImgSrc = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
//-----------------------------------------------------------------------

// <=========================== SIDEBAR ===========================> //

function changeActive() {
  menuItems.forEach((item) => item.classList.remove("active"));
}
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActive();
    item.classList.add("active");
  });
});

sidebarNews.addEventListener("click", function () {
  newsContainer.classList.remove("hidden");
  feedContainer.classList.add("hidden");
  postForm.classList.add("hidden");
});
sidebarFeed.addEventListener("click", function () {
  newsContainer.classList.add("hidden");
  feedContainer.classList.remove("hidden");
  postForm.classList.remove("hidden");
});

//-----------------------------------------------------------------------

// <=========================== POSTING ===========================> //

//preview img//
const inputImg = document.querySelector("#inputImg");
inputImg.addEventListener("change", previewFile);
function previewFile() {
  const preview = document.querySelector("#previewImg");
  previewContainer.classList.remove("hidden");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    currPostImgSrc = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
//post click//
const currentUser = new User("Eden Cohen", 26, "Israel");
postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  previewContainer.classList.add("hidden");
  const time = new Date().toLocaleString();
  const text = document.querySelector("#create-post");
  const postBody = text.value;
  text.value = "";
  const post = new Post(currentUser, postBody, time, currPostImgSrc);
  const postHtml = post.generateHtml();
  feedContainer.insertAdjacentHTML("afterbegin", postHtml);
  //write post to data base
});

function loadPost() {
  //get post list from data base
  //post.generateHtml
  //feedContanier.insert(afterstart)
}
//-----------------------------------------------------------------------
