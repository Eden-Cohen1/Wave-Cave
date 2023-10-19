"use strict";
import { Post, Comment } from "./post.js";
import { User } from "./user.js";
// import { createUser } from "../server.js";
// import { newUser } from "../db/models/user.js";

const postForm = document.querySelector(".create-post");
const signupForm = document.querySelector(".signup__form");
const loginForm = document.querySelector(".login__form");
const sidebarNews = document.querySelector("#news");
const sidebarFeed = document.querySelector("#feed");
const btnLogo = document.querySelector(".logo-img");
const btnSignup = document.querySelector(".signup");
const btnLogin = document.querySelector(".login");
const btnLogout = document.querySelector(".logout");
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
let formComment = document.querySelector(".comment-input");
let btnLike = document.querySelector(".uil-heart");
let btnComment = document.querySelectorAll(".uil-comment-dots");
let btnShare = document.querySelector(".uil-share-alt");
let currPostImgSrc = "";
let currProfileImgSrc = "";
function addArticle(articles) {
  for (let i = 0; i < articles; i++) {
    articleContainer.appendChild(article.cloneNode(true));
  }
}

addArticle(8);
const users = [];

//home
btnLogo.addEventListener("click", () => {
  window.location.href = "/";
});
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

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = loginForm.querySelector(".email").value;
  const password = loginForm.querySelector(".password").value;
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      updateUser(data);
      btnSignup.classList.add("hidden");
      btnLogin.classList.add("hidden");
      btnLogout.classList.remove("hidden");
      closeModalLG();
    });
});

function updateUser(user) {
  const profilePohots = document.querySelectorAll(
    ".profile-photo.curr-user img"
  );
  const handle = document.querySelector(".hashtag");
  const name = document.querySelector(".handle h4");
  const postHolder = document.querySelector(".create-post input");
  currentUser = user;
  profilePohots.forEach((img) => (img.src = user.img));
  handle.textContent = user.handle;
  name.textContent = user.name;
  postHolder.placeholder = `Share a surfing expirience, ${
    user.name.split(" ")[0]
  }`;
}
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

//PROFILE PHOTO//
const inputProfileImg = document.querySelector("#inputProfileImg");
inputProfileImg.addEventListener("change", previewProfileImg);
function previewProfileImg() {
  const preview = document.querySelector("#previewProfileImg");
  preview.classList.remove("hidden");
  const file = signupForm.querySelector("input[type=file]").files[0];
  const reader = new FileReader();
  reader.onload = function () {
    preview.src = reader.result;
    preview.classList.remove("hidden");
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
let currentUser = new User("Eden Cohen", 26, "Israel");
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
  btnComment = document.querySelectorAll(".uil-comment-dots");
  postBtnsListen();
});

function loadPost() {
  //get post list from data base
  //post.generateHtml
  //feedContanier.insert(afterstart)
}
//-----------------------------------------------------------------------

// <=========================== LIKE/COMMENT/SHARE ===========================> //

function postBtnsListen() {
  btnLike.addEventListener("click", function (e) {
    e.preventDefault();
    const post = btnLike.closest(".feed");
    post.likes.push(currentUser);
    post.generateHtml();
  });

  btnComment.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const formID = btn.dataset.itemId;
      const form = document.querySelector(`#${formID}`);
      form.classList.contains("hidden")
        ? form.classList.remove("hidden")
        : form.classList.add("hidden");
    })
  );
}
postBtnsListen();
