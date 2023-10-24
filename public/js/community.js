"use strict";

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
const previewContainer = document.querySelector(".img-preview");
const menuItems = document.querySelectorAll(".menu-item");

let currentPage = 1;
loadPosts();
let formComment = document.querySelector(".comment-input");
let btnsLike = document.querySelector(".uil-heart");
let btnsComment = document.querySelectorAll(".uil-comment-dots");
let btnsShare = document.querySelectorAll(".uil-share-alt");
let currPostImgSrc = "";
let currProfileImgSrc = "";
let currentUser;
getUserData();
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
// <=========================== LOAD-POSTS ===========================> //
const loadedPosts = new Set();

async function loadPosts() {
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
// async function loadPosts() {
//   const response = await fetch(`/api/feed?page=${currentPage}`);
//   const postHtmlList = await response.json();
//   if (postHtmlList.length > 0) {
//     postHtmlList.forEach((post) => {
//       feedContainer.insertAdjacentHTML("beforeend", post.html);
//       const postElement = document.querySelector(`#${post.id}`);
//       const likeBtn = postElement.querySelector(".uil-heart");
//       likeBtn.addEventListener("click", async function (e) {
//         e.preventDefault();
//         console.log(likeBtn, "clicked");
//         const postId = likeBtn.dataset.itemId;
//         fetch("/like", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ postId }),
//         })
//           .then((response) => response.json())
//           .then((post) => {
//             const likeText = postElement.querySelector(".liked-by p");
//             likeText.textContent = `Liked by ${post.likes.length} people`;
//             likeBtn.classList.add("btn-active");
//           });
//       });
//       currentPage++;
//     });
//   }
// }
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadPosts();
    btnsLike = document.querySelectorAll(".uil-heart");
    btnsComment = document.querySelectorAll(".uil-comment-dots");
    btnsShare = document.querySelectorAll(".uil-share-alt");
  }
});

// <=========================== REFRESH ===========================> //

function checkLoggedIn() {
  const storedSession = localStorage.getItem("sessionData");
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
postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  previewContainer.classList.add("hidden");

  const text = document.querySelector("#create-post");
  const postBody = text.value;
  const imgName = inputImg.files[0] ? inputImg.files[0].name : "";
  const formData = new FormData(e.target);
  formData.append("imgName", imgName);
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

feedContainer.addEventListener("click", async function (e) {
  e.preventDefault();
  if (e.target.classList.contains("uil-heart")) {
    const targetPost = e.target.closest(".feed");
    const postId = targetPost.getAttribute("id");
    const likedBy = targetPost.querySelector(".liked-by p");
    fetch("/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
    })
      .then((response) => response.json())
      .then((post) => {
        if (!post) {
          return;
        }
        likedBy.textContent = `Liked by ${post.likes.length} people`;
        e.target.classList.add("btn-active");
      });
  }
});

// const postId = btn.closest(".feed");
// btnsLike?.forEach(
//   btn
//     .addEventListener("click", function (e) {
//       e.preventDefault();
//       const postId = btn.dataset.itemId;
//       fetch("/like", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ postId }),
//       });
//     })
//     .then((response) => response.json())
//     .then((post) => {
//       const parentElement = btn.closest();
//       const likeText = parentElement.querySelector(".liked-by p");
//       likeText.textContent = `Liked by ${post.likes.length} people`;
//       btn.classList.add("btn-active");
//     })
// );

// btnsComment.forEach((btn) =>
//   btn?.addEventListener("click", function (e) {
//     e.preventDefault();
//     const formID = btn.dataset.itemId;
//     const form = document.querySelector(`#${formID}`);
//     form.classList.contains("hidden")
//       ? form.classList.remove("hidden")
//       : form.classList.add("hidden");
//   })
// );
