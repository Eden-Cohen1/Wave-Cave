"use strict";
const postForm = document.querySelector(".create-post");
const createPostDiv = document.querySelector(".create-post-div");
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
const articleContainer = document.querySelector(".articles");
const feedContainer = document.querySelector(".feeds");
const newsContainer = document.querySelector(".news");
const containerMid = document.querySelector(".mid");
const profileContainer = document.querySelector(".my-profile");
const previewContainer = document.querySelector(".img-preview");
const menuItems = document.querySelectorAll(".menu-item");
let profilePostContainer = document.querySelector(".user-posts");
let currentPage = 1;
let currPostImgSrc = "";
let currentUser;
let currPage = 1;
let currPath = `/api/feed?page=${currPage}`;
let currUserid = "none";
let isMainFeed = true;
loadFeedPosts(currPath, currUserid, isMainFeed);

btnLogo.addEventListener("click", () => {
  window.location.href = "/";
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
    console.log("user not logged in");
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
  currentUser = userData;
  updateUser(userData);
}
// <=========================== LOAD-POSTS ===========================> //

let loadedPostsSet = new Set();
async function loadFeedPosts(path, userId, isMainFeed) {
  if (!currentUser) {
    await getUserData();
  }
  const response = await fetch(`${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
  });
  const data = await response.json();
  updateUserProfile(data.user, data.userHtml);
  addUniquePosts(data, isMainFeed);
}

function addUniquePosts(data, isMainFeed) {
  if (isMainFeed) {
    const uniquePosts = data.postHtmlList.filter((post) => {
      return !loadedPostsSet.has(post.id);
    });
    if (uniquePosts.length > 0) {
      uniquePosts.forEach((post) => {
        loadedPostsSet.add(post.id);
        feedContainer.insertAdjacentHTML("beforeend", post.html);
      });
      currPage++;
    }
  } else {
    const uniquePosts = data.postHtmlList.filter((post) => {
      const loadedPosts = [...profilePostContainer.querySelectorAll(".feed")];
      const loadedPostsID = loadedPosts.map((post) => post.getAttribute("id"));
      return !loadedPostsID.includes(post.id);
    });
    profilePostContainer = document.querySelector(".user-posts");
    if (uniquePosts.length === 0) return;
    uniquePosts.forEach((post) => {
      profilePostContainer.insertAdjacentHTML("beforeend", post.html);
    });
  }
  document
    .querySelectorAll(".comment-input .profile-photo img")
    .forEach((img) => (img.src = currentUser?.img));
}
window.addEventListener("scroll", () => {
  if (sidebarFeed.classList.contains("hidden") || !isMainFeed) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (isMainFeed) {
      currPath = `/api/feed?page=${currPage}`;
      console.log(currPath);
      loadFeedPosts(currPath, currUserid, isMainFeed);
    }
  }
});
// <=========================== USER-PROFILE ===========================> //

function updateUserProfile(user, userProfileHtml) {
  const isProfileLoaded = document.querySelector(".container-profile");
  if (!user) {
    return null;
  }
  if (isProfileLoaded) {
    if (isProfileLoaded.getAttribute("id") == user.userID) {
      return null;
    }
  }
  profileContainer.innerHTML = userProfileHtml;
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
      currentUser = data.currentUser;
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
  console.log(profilePohots);
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
  profileContainer.classList.add("hidden");
  currentUser = null;
  location.reload();
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
  if (currentUser) {
    createPostDiv.classList.remove("hidden");
  }
  isMainFeed = true;
  currPath = `/api/feed?page=${currPage}`;
  loadFeedPosts(currPath, currUserid, isMainFeed);
});

sidebarProfile.addEventListener("click", async function (e) {
  const isProfileLoaded = document.querySelector(".container-profile");
  moveToUserProfile();
  if (
    currentUser &&
    !isProfileLoaded?.getAttribute("id") != currentUser.userID
  ) {
    isMainFeed = false;
    currPath = `/api/my-profile`;
    loadFeedPosts(currPath, currUserid, isMainFeed);
  }
});

sidebarNews.addEventListener("click", function () {
  newsContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden");
  feedContainer.classList.add("hidden");
  createPostDiv.classList.add("hidden");
  updateNews();
});

function moveToUserProfile() {
  profileContainer.classList.remove("hidden");
  feedContainer.classList.add("hidden");
  newsContainer.classList.add("hidden");
  createPostDiv.classList.add("hidden");
}
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
createPostDiv.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("post")) {
    previewContainer.classList.add("hidden");

    const text = document.querySelector("#create-post");
    const imgName = inputImg.files[0] ? inputImg.files[0].name : "";
    const formData = new FormData(postForm);
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
  }
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

function commentPost(post) {
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

      const newPostElement = document.querySelector(`#${postID}`);
      newPostElement.querySelector(".comment-input img").src = currentUser?.img;
    });
}

function openCommentSection(input, section) {
  input.classList.remove("hidden");
  section.classList.remove("hidden");
  input.querySelector('input[type="text"]').focus();
}
function closeCommentSection(input, section) {
  input.classList.add("hidden");
  section.classList.add("hidden");
}
function goToUser(userId) {
  currPath = `/api/profile`;
  currUserid = userId;
  isMainFeed = false;
  moveToUserProfile();
  loadFeedPosts(currPath, currUserid, isMainFeed);
  changeActive();
}
feedContainer.addEventListener("click", async function (e) {
  e.preventDefault();
  const post = e.target.closest(".feed");
  const commentSection = post.querySelector(".comments");
  const commentInput = post.querySelector(".comment-input");

  // LIKE //
  if (e.target.classList.contains("uil-heart")) {
    if (!currentUser) {
      window.alert("Login to engage with posts");
      return;
    }
    const postId = post.getAttribute("id");
    if (!e.target.classList.contains("btn-active")) {
      likePost(e.target, post);
    } else {
      unlikePost(postId, post);
    }
  }

  // COMMENTS //
  if (e.target.classList.contains("uil-comment-dots")) {
    if (!currentUser) {
      window.alert("Login to engage with posts");
      return;
    }
    openCommentSection(commentInput, commentSection);
    post.querySelector(".view-comments").classList.add("hidden");
  }
  if (e.target.classList.contains("post-click")) {
    commentPost(post);
  }
  if (e.target.classList.contains("view-comments")) {
    openCommentSection(commentInput, commentSection);
    e.target.classList.add("hidden");
  }
  if (e.target.classList.contains("hide-comments")) {
    closeCommentSection(commentInput, commentSection);
    post.querySelector(".view-comments").classList.remove("hidden");
  }
  if (e.target.classList.contains("user-click")) {
    goToUser(e.target.getAttribute("id"));
  }
});

async function followUser(target) {
  const profile = target.closest(".container-profile");
  const userID = profile.getAttribute("id");
  fetch("/follow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID }),
  })
    .then((response) => response.json())
    .then((newCount) => {
      profile.querySelector(".followersCount h3").textContent = newCount;
      const followState = profile.querySelector("a.follow");
      followState.classList.remove("follow");
      followState.classList.add("unfollow");
      followState.textContent = "Following";
    });
}
async function unfollowUser(target) {
  const profile = target.closest(".container-profile");
  const userID = profile.getAttribute("id");
  fetch("/unfollow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID }),
  })
    .then((response) => response.json())
    .then((newCount) => {
      profile.querySelector(".followersCount h3").textContent = newCount;
      const followState = profile.querySelector("a.unfollow");
      followState.classList.remove("unfollow");
      followState.classList.add("follow");
      followState.textContent = "Follow";
    });
}
// USER PROFILE //
profileContainer.addEventListener("click", async function (e) {
  e.preventDefault();
  // LIKE //
  if (e.target.classList.contains("uil-heart")) {
    const post = e.target.closest(".feed");
    const postId = post.getAttribute("id");
    if (!e.target.classList.contains("btn-active")) {
      likePost(e.target, post);
    } else {
      unlikePost(postId, post);
    }
  }
  // COMMENTS //
  if (e.target.classList.contains("uil-comment-dots")) {
    const post = e.target.closest(".feed");
    const commentSection = post.querySelector(".comments");
    const commentInput = post.querySelector(".comment-input");
    openCommentSection(commentInput, commentSection);
    post.querySelector(".view-comments").classList.add("hidden");
  }
  if (e.target.classList.contains("post-click")) {
    const post = e.target.closest(".feed");
    commentPost(post);
  }
  if (e.target.classList.contains("view-comments")) {
    const post = e.target.closest(".feed");
    const commentSection = post.querySelector(".comments");
    const commentInput = post.querySelector(".comment-input");
    openCommentSection(commentInput, commentSection);
    e.target.classList.add("hidden");
  }
  if (e.target.classList.contains("hide-comments")) {
    const post = e.target.closest(".feed");
    const commentSection = post.querySelector(".comments");
    const commentInput = post.querySelector(".comment-input");
    closeCommentSection(commentInput, commentSection);
    post.querySelector(".view-comments").classList.remove("hidden");
  }
  // GO TO USER //
  if (e.target.classList.contains("user-click")) {
    goToUser(e.target.getAttribute("id"));
  }
  if (e.target.classList.contains("follow")) {
    followUser(e.target);
  }
  if (e.target.classList.contains("unfollow")) {
    unfollowUser(e.target);
  }
});

//READ-MORE (COMMENTS)
const readMorePrefaceMaxLength = 120;
const readMoreTexts = document.querySelectorAll(".read-more-text");
readMoreTexts.forEach((readMoreText) => {
  const extra = SliceHTML.sliceHTML(readMoreText, readMorePrefaceMaxLength);
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

// <=========================== NEWS ===========================> //
function addArticles(articles) {
  articles.forEach((article) => {
    const html = `<div class="card">
    <img
      class="card-img-top"
      src=${article.image}
      alt="Card image cap"
    />
    <div class="card-body">
      <h5 class="card-title"><b>${article.title}</b></h5>
      <p class="card-text">
        ${article.description}
      </p>
      <a href=${article.url} class="btn btn-primary">Read more</a>
    </div>
  </div>`;
    articleContainer.insertAdjacentHTML("beforeend", html);
  });
}
async function updateNews() {
  const response = await fetch("/news", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve news data");
  }
  const articles = await response.json();
  addArticles(articles);
}
