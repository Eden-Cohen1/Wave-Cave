"use strict";

const postForm = document.querySelector(".create-post");
const signupForm = document.querySelector(".signup__form");
const loginForm = document.querySelector(".login__form");
const sidebarNews = document.querySelector("#news");
const sidebarFeed = document.querySelector("#feed");
const sidebarProfile = document.querySelector("#my-profile");
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
const myPostsContainer = document.querySelector(".user-posts");
const newsContainer = document.querySelector(".news");
const profileContainer = document.querySelector(".my-profile");
const previewContainer = document.querySelector(".img-preview");
const menuItems = document.querySelectorAll(".menu-item");

let currentPage = 1;
let myPostCurrentPage = 1;
let formComment = document.querySelector(".comment-input");
let btnsLike = document.querySelector(".uil-heart");
let btnsComment = document.querySelectorAll(".uil-comment-dots");
let btnsShare = document.querySelectorAll(".uil-share-alt");
let currPostImgSrc = "";
let currProfileImgSrc = "";
let currentUser;
loadPosts();
function addArticle(articles) {
  for (let i = 0; i < articles; i++) {
    articleContainer.appendChild(article.cloneNode(true));
  }
}

addArticle(8);
const users = [];

btnLogo.addEventListener("click", () => {
  window.location.href = "/";
});

// <=========================== REFRESH ===========================> //

function checkLoggedIn() {
  const storedSession = localStorage.getItem("sessionData");
  console.log(storedSession);
  if (storedSession) {
    return JSON.parse(storedSession);
  }
  return null; // User is not logged in
}

async function getUserData() {
  const userInfo = checkLoggedIn();
  if (!userInfo) {
    return;
  }
  const response = await fetch("/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.userId}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve user data");
  }

  const userData = await response.json();
  updateUser(userData);
}
// <=========================== LOAD-POSTS ===========================> //
const loadedPosts = new Set();

async function loadPosts() {
  await getUserData();

  const response = await fetch(`/api/feed?page=${currentPage}`);
  const postHtmlList = await response.json();
  if (postHtmlList.length > 0) {
    const uniquePosts = postHtmlList.filter(
      (post) => !loadedPosts.has(post.id)
    );
    uniquePosts.forEach((post) => {
      feedContainer.insertAdjacentHTML("beforeend", post.html);
      loadedPosts.add(post.id);
    });

    currentPage++;
  }
}
window.addEventListener("scroll", () => {
  if (sidebarFeed.classList.contains("hidden")) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadPosts();
    btnsLike = document.querySelectorAll(".uil-heart");
    btnsComment = document.querySelectorAll(".uil-comment-dots");
    btnsShare = document.querySelectorAll(".uil-share-alt");
  }
});

// <=========================== LOAD-MY-POSTS ===========================> //
const myLoadedPosts = new Set();
async function loadMyPosts() {
  await getUserData();

  const response = await fetch(`/api/myPosts?page=${myPostCurrentPage}`);
  const postHtmlList = await response.json();
  if (postHtmlList.length > 0) {
    const uniquePosts = postHtmlList.filter(
      (post) => !myLoadedPosts.has(post.id)
    );
    uniquePosts.forEach((post) => {
      myPostsContainer.insertAdjacentHTML("beforeend", post.html);
      myLoadedPosts.add(post.id);
    });

    myPostCurrentPage++;
  }
}
window.addEventListener("scroll", () => {
  if (sidebarProfile.classList.contains("hidden")) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadPosts();
    btnsLike = document.querySelectorAll(".uil-heart");
    btnsComment = document.querySelectorAll(".uil-comment-dots");
    btnsShare = document.querySelectorAll(".uil-share-alt");
  }
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
      if (!data) {
        window.alert("Wrong email or password, please try again..");
        closeModalLG();
        return;
      }
      updateUser(data.currentUser);
      closeModalLG();
      const sessionData = {
        userId: data.currentUser.userID,
      };
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
    });
});

function updateUser(user) {
  const profilePohots = document.querySelectorAll(
    ".profile-photo.curr-user img"
  );
  const handle = document.querySelector(".hashtag");
  const name = document.querySelector(".handle h4");
  const postHolder = document.querySelector(".create-post input");
  const postSection = document.querySelector(".create-post");
  postSection.classList.remove("hidden");
  currentUser = user;
  profilePohots.forEach((img) => (img.src = user.img));
  handle.textContent = `@${user.handle}`;
  name.textContent = user.name;
  postHolder.placeholder = `Share a surfing expirience, ${
    user.name.split(" ")[0]
  }`;
  btnSignup.classList.add("hidden");
  btnLogin.classList.add("hidden");
  btnLogout.classList.remove("hidden");
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

// <=========================== LOGOUT ===========================> //

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("sessionData");
  const profilePohots = document.querySelectorAll(
    ".profile-photo.curr-user img"
  );
  const handle = document.querySelector(".hashtag");
  const name = document.querySelector(".handle h4");
  const postSection = document.querySelector(".create-post");
  handle.textContent = "@Guest";
  name.textContent = "Guest";
  profilePohots.forEach((img) => (img.src = "./images/profile-photo.png"));
  postSection.classList.add("hidden");
  btnLogout.classList.add("hidden");
  btnLogin.classList.remove("hidden");
  btnSignup.classList.remove("hidden");
});

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

sidebarFeed.addEventListener("click", function () {
  newsContainer.classList.add("hidden");
  profileContainer.classList.add("hidden");
  feedContainer.classList.remove("hidden");
  postForm.classList.remove("hidden");
});

sidebarProfile.addEventListener("click", function () {
  profileContainer.classList.remove("hidden");
  feedContainer.classList.add("hidden");
  newsContainer.classList.add("hidden");

  loadMyPosts();
});

sidebarNews.addEventListener("click", function () {
  newsContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden");
  feedContainer.classList.add("hidden");
  postForm.classList.add("hidden");
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
postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  previewContainer.classList.add("hidden");

  const text = document.querySelector("#create-post");
  const imgName = inputImg.files[0] ? inputImg.files[0].name : "";
  const formData = new FormData(e.target);
  formData.append("imgName", imgName);
  console.log(formData);
  text.value = "";

  fetch("/Post", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((html) => {
      feedContainer.insertAdjacentHTML("afterbegin", html);
    });
});

//-----------------------------------------------------------------------

// <=========================== LIKE/COMMENT/SHARE ===========================> //

function likePost(likeBtn, targetPost) {
  const postId = targetPost.getAttribute("id");
  if (!likeBtn.classList.contains("btn-active")) {
    fetch("/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    })
      .then((response) => response.json())
      .then((postHtml) => {
        if (!postHtml) {
          return;
        }
        targetPost.outerHTML = postHtml;
      });
  }
}
function unlikePost(postId, targetPost) {
  fetch("/unlike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  })
    .then((response) => response.json())
    .then((postHtml) => {
      if (!postHtml) {
        return;
      }
      targetPost.outerHTML = postHtml;
    });
}

function commentPost(commentBtn) {
  const post = commentBtn.closest(".feed");
  const postID = post.getAttribute("id");
  const input = post.querySelector('input[type="text"]');
  const formData = { text: input.value, postId: postID };
  fetch("/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((html) => {
      post.outerHTML = html;
    });
}

// function openCommentSection();
//LIKE
feedContainer.addEventListener("click", async function (e) {
  e.preventDefault();
  if (e.target.classList.contains("uil-heart")) {
    const targetPost = e.target.closest(".feed");
    const postId = targetPost.getAttribute("id");
    if (!e.target.classList.contains("btn-active")) {
      likePost(e.target, targetPost);
    } else {
      unlikePost(postId, targetPost);
    }
  }
  //COMMENTS
  if (e.target.classList.contains("uil-comment-dots")) {
    const post = e.target.closest(".feed");
    const commentInput = post.querySelector(".comment-input");
    commentInput.classList.remove("hidden");
  }
  if (e.target.classList.contains("post-click")) {
    commentPost(e.target);
  }
  if (e.target.classList.contains("view-comments")) {
    const post = e.target.closest(".feed");
    const commentSection = post.querySelector(".comments");
    commentSection.classList.remove("hidden");
    e.target.classList.add("hidden");
  }
});

//COMMENT
// feedContainer.addEventListener("click", async function (e) {
//   e.preventDefault();
//   const input = e.target.querySelector('input[type="text"]');
//   if (e.target.classList.contains("uil-comment-dots")) {
//     const commentInput = document.querySelector(".comment-input");
//     commentInput.classList.remove("hidden");
//   }
//   if (e.target.classList.contains("post-click")) {
//     const post = e.target.closest(".feed");
//     const postID = post.getAttribute("id");
//     console.log(input, postID);
//     const formData = { text: input.value, postid: postID };
//     fetch("/comment", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((html) => {
//         feedContainer.insertAdjacentHTML("afterbegin", html);
//       });
//   }
// });
//COMMENTS LENGTH

const readMorePrefaceMaxLength = 120;
const readMoreTexts = document.querySelectorAll(".read-more-text");
readMoreTexts.forEach((readMoreText) => {
  const extra = SliceHTML.sliceHTML(readMoreText, readMorePrefaceMaxLength);
  console.log(extra);
  if (extra.textContent.length === 0) {
    return;
  }
  const preface = SliceHTML.sliceHTML(
    readMoreText,
    0,
    readMorePrefaceMaxLength
  );
  readMoreText.innerHTML = "";
  readMoreText.append(preface);
  const extraSpan = document.createElement("span");
  extraSpan.hidden = true;
  extraSpan.append(extra);
  const button = document.createElement("a");
  button.classList.add("read-more-button");
  button.textContent = "... read more";
  button.addEventListener("click", () => {
    button.hidden = true;
    extraSpan.hidden = false;
  });
  readMoreText.append(button);
  readMoreText.append(extraSpan);
});
