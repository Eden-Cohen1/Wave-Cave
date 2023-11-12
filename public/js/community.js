"use strict";

const postForm = document.querySelector(".create-post");
const createPostDiv = document.querySelector(".create-post-div");
const signupForm = document.querySelector(".signup__form");
const loginForm = document.querySelector(".login__form");
const sidebarNews = document.querySelector("#news");
const sidebarFeed = document.querySelector("#feed");
const sidebarProfile = document.querySelector("#my-profile");
const sidebarNotifications = document.querySelector("#notifications");
const notifPopup = document.querySelector(".left .notifications-popup");
const singlePost = document.querySelector(".single-post");
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
const btnSearch = document.querySelector(".search-bar button");
const inputSearch = document.querySelector(".search-bar input");
const searchResultDiv = document.querySelector(".search-results");
const signupModal = document.querySelector(".sign-up-modal");
const loginModal = document.querySelector(".login-modal");
const modalOverlay = document.querySelector(".overlay-modal");
const articleContainer = document.querySelector(".articles");
const feedContainer = document.querySelector(".feeds");
const mainContainer = document.querySelector("main");
const newsContainer = document.querySelector(".news");
const containerMid = document.querySelector(".mid");
const profileContainer = document.querySelector(".my-profile");
const previewContainer = document.querySelector(".img-preview");
const menuItems = document.querySelectorAll(".menu-item");
const usersModal = document.querySelector(".users-modal");
const loadingContainer = document.createElement("div");
loadingContainer.className = "loading-container";
const loadingSpinner = document.createElement("div");
loadingSpinner.className = "loading-spinner";
loadingContainer.appendChild(loadingSpinner);
let profilePostContainer = document.querySelector(".user-posts");
let currentUser;
let currPage = 1;
let currPath = `/api/feed?page=${currPage}`;
let currUserid = "none";
let isMainFeed = true;
loadFeedPosts(currPath, currUserid, isMainFeed);

btnLogo.addEventListener("click", () => {
  window.location.href = "/";
});

// <=========================== INIT FUNCTIONS ===========================> //

async function getUserData() {
  await fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((userData) => {
      if (!userData || !userData.user) {
        return;
      }
      currentUser = userData.user;
      const notifPopup = document.querySelector(".notifications-popup");
      document.querySelector(".notification-count").textContent = `${
        userData.user.notifications.filter((notif) => !notif.seen).length
      }+`;
      notifPopup.innerHTML = userData.notifHtml;
      updateUser(userData.user);
    });
}

let loadedPostsSet = new Set();
async function loadFeedPosts(path, userId, isMainFeed) {
  if (!currentUser) {
    await getUserData();
  }
  profileContainer.innerHTML = `<div class="loading-container">
  <div class="loading-spinner"></div>
</div>`;
  const response = await fetch(`${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
  });
  const data = await response.json();
  if (!data?.postHtmlList || data?.postHtmlList?.length < 1) {
    console.log("no posts left");
  }
  profilePostContainer.innerHTML = "";
  updateUserProfile(data.user, data.userHtml);
  addUniquePosts(data, isMainFeed);
}

function addUniquePosts(data, isMainFeed) {
  console.log(isMainFeed);
  if (isMainFeed) {
    const uniquePosts = data.postHtmlList?.filter((post) => {
      return !loadedPostsSet.has(post.id);
    });
    if (uniquePosts?.length > 0) {
      uniquePosts.forEach((post) => {
        loadedPostsSet.add(post.id);
        feedContainer.insertAdjacentHTML("beforeend", post.html);
      });
      currPage++;
    }
  } else {
    const uniquePosts = data.postHtmlList?.filter((post) => {
      const loadedPosts = [...profilePostContainer.querySelectorAll(".feed")];
      console.log(loadedPosts);
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
function hideAll() {
  searchResultDiv.classList.add("hidden");
  feedContainer.classList.add("hidden");
  createPostDiv.classList.add("hidden");
  profileContainer.classList.add("hidden");
  newsContainer.classList.add("hidden");
}
// <=========================== INFINITE SCROLL ===========================> //

window.addEventListener("scroll", () => {
  if (sidebarFeed.classList.contains("hidden") || !isMainFeed) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (isMainFeed) {
      currPath = `/api/feed?page=${currPage}`;
      loadFeedPosts(currPath, currUserid, isMainFeed);
    }
  }
});
//-----------------------------------------------------------------------

// <=========================== USERS ===========================> //

function updateUserProfile(user, userProfileHtml) {
  const isProfileLoaded = document.querySelector(".container-profile");
  if (!user) {
    profileContainer.innerHTML = `<h3>Log in to watch your profile</h3>
    <a href=""
    ><button class="btn-primary login" onclick="openModalLG()">Login</button></a
  >`;
    console.log(profileContainer.innerHTML, "@@@");
    return null;
  }
  if (isProfileLoaded) {
    if (isProfileLoaded.getAttribute("id") == user.userID) {
      return null;
    }
  }
  profileContainer.innerHTML = userProfileHtml;
}
//-----------------------------------------------------------------------

// <=========================== MODALS ===========================> //

const openModalLG = function (e) {
  e.preventDefault();
  loginModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

const closeModalLG = function () {
  loginModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};
function openLikesModal(postId) {
  fetch("/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  })
    .then((response) => response.json())
    .then((likes) => {
      console.log(likes);
      const likesLinks = document.querySelector(".user-links");
      likesLinks.innerHTML = likes.html;
      usersModal.querySelector("h3").textContent = "Likes";
      usersModal.classList.remove("hidden");
    });
}

function openFollowModal(userID, path) {
  console.log(userID);
  fetch(`/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID }),
  })
    .then((response) => response.json())
    .then((follows) => {
      console.log(follows);
      const followsLinks = document.querySelector(".user-links");
      followsLinks.innerHTML = follows.html;
      usersModal.querySelector("h3").textContent =
        path[0].toUpperCase() + path.slice(1);
      usersModal.classList.remove("hidden");
    });
}
const openModalSU = function (e) {
  e.preventDefault();
  signupModal.classList.remove("hidden");
  modalOverlay.classList.remove("hidden");
};

const closeModalSU = function () {
  signupModal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
};
//-----------------------------------------------------------------------
// <=========================== SEARCH ===========================> //
function search() {
  const searchTerm = inputSearch.value;
  if (searchTerm !== "") {
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.html);
        hideAll();
        searchResultDiv.classList.remove("hidden");
        inputSearch.value = "";
        if (result.html.length < 30) {
          searchResultDiv.innerHTML = `<h4>No results found. Try another search.</h4>`;
          return;
        }
        searchResultDiv.innerHTML = result.html;
      });
  }
}

btnSearch.addEventListener("click", search);
inputSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    search();
  }
});
//-----------------------------------------------------------------------

// <=========================== LOGIN ===========================> //

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
        loginForm.querySelector(".password").value = "";
        window.alert("Wrong email or password, please try again..");
        closeModalLG();
        return;
      }
      currentUser = data.currentUser;
      updateUser(data.currentUser);
      const notifPopup = document.querySelector(".notifications-popup");
      notifPopup.innerHTML = data.notifHtml;
      closeModalLG();
      location.reload();
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
  profilePohots.forEach((img) => {
    img.src = user.img;
    img.id = user.userID;
  });
  handle.textContent = `@${user.handle}`;
  name.textContent = user.name;
  postHolder.placeholder = `Share a surfing expirience, ${
    user.name.split(" ")[0]
  }`;
  btnSignup.classList.add("hidden");
  btnLogin.classList.add("hidden");
  btnLogout.classList.remove("hidden");
}
//-----------------------------------------------------------------------

// <=========================== SIGNUP ===========================> //

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
  fetch("/logout", { method: "GET" });
  location.reload();
});

//-----------------------------------------------------------------------

// <=========================== SIDEBAR ===========================> //

function moveToUserProfile() {
  profileContainer.classList.remove("hidden");
  feedContainer.classList.add("hidden");
  newsContainer.classList.add("hidden");
  createPostDiv.classList.add("hidden");
  notifPopup.classList.add("hidden");
  singlePost.classList.add("hidden");
  searchResultDiv.classList.add("hidden");
}
function changeActive() {
  menuItems.forEach((item) => item.classList.remove("active"));
}
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActive();
    item.classList.add("active");
  });
});

sidebarFeed.addEventListener("click", async function () {
  if (currentUser) {
    createPostDiv.classList.remove("hidden");
  } else {
    await getUserData();
    createPostDiv.classList.remove("hidden");
  }
  newsContainer.classList.add("hidden");
  profileContainer.classList.add("hidden");
  feedContainer.classList.remove("hidden");
  notifPopup.classList.add("hidden");
  singlePost.classList.add("hidden");

  isMainFeed = true;
  currPath = `/api/feed?page=${currPage}`;
  loadFeedPosts(currPath, currUserid, isMainFeed);
});

sidebarProfile.addEventListener("click", async function () {
  const isProfileLoaded = document.querySelector(".container-profile");
  moveToUserProfile();
  if (
    currentUser &&
    !isProfileLoaded?.getAttribute("id") != currentUser.userID
  ) {
    isMainFeed = false;
    currPath = `/api/my-profile`;
    loadFeedPosts(currPath, currUserid, isMainFeed);
  } else {
    profileContainer.innerHTML = `<h3>Log in to watch your profile</h3>
    <a href=""
    ><button class="btn-primary login" onclick="openModalLG()">Login</button></a
  >`;
  }
});

sidebarNotifications.addEventListener("click", async function () {
  if (notifPopup.classList.contains("hidden")) {
    notifPopup.classList.remove("hidden");
  } else {
    notifPopup.classList.add("hidden");
    sidebarNotifications.classList.remove("active");
  }
});
sidebarNews.addEventListener("click", function () {
  newsContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden");
  feedContainer.classList.add("hidden");
  createPostDiv.classList.add("hidden");
  notifPopup.classList.add("hidden");
  singlePost.classList.add("hidden");
  newsContainer.innerHTML = `<div class="loading-container">
  <div class="loading-spinner"></div>
</div>`;
  updateNews();
});

//-----------------------------------------------------------------------

// <=========================== POSTING ===========================> //

//preview img//
const convertBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const inputImg = document.querySelector("#inputImg");
let base64Url;
inputImg.addEventListener("change", async function (e) {
  const preview = document.querySelector("#previewImg");
  previewContainer.classList.remove("hidden");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.onloadend = async function () {
    base64Url = await convertBase64(file);
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
});
//post click//
createPostDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("post") && !e.target.disabled) {
    e.preventDefault();
    const text = document.querySelector("#create-post");
    if (text.value.length < 1) {
      window.alert(
        "Oops! This post appears to be empty. Please add some content before posting."
      );
      return;
    }
    if (feedContainer.firstChild) {
      feedContainer.insertBefore(loadingContainer, feedContainer.firstChild);
    } else {
      feedContainer.appendChild(loadingContainer);
    }
    const imgUrl = base64Url;
    const formData = new FormData(postForm);
    previewContainer.classList.add("hidden");
    formData.append("imgUrl", imgUrl);
    text.value = "";
    e.target.disabled = true;
    fetch("/Post", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((html) => {
        loadingContainer.parentNode.removeChild(loadingContainer);
        feedContainer.insertAdjacentHTML("afterbegin", html);
      })
      .finally(() => (e.target.disabled = false));
  }
});

//-----------------------------------------------------------------------

// <=========================== ENGAGEMENT ===========================> //

function likePost(likeBtn, targetPost) {
  const postId = targetPost.getAttribute("id");
  if (!likeBtn.classList.contains("btn-active")) {
    likeBtn.disabled = true;
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
      })
      .finally(() => (likeBtn.disabled = false));
  }
}
function unlikePost(postId, targetPost, unlikeBtn) {
  unlikeBtn.disabled = true;
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
    })
    .finally(() => (unlikeBtn.disabled = false));
}
function commentPost(post, commentBtn) {
  commentBtn.disabled = true;
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

      const newPostElement = document.querySelector(`.feed #${postID} img`);
      console.log(newPostElement);
      newPostElement.src = currentUser?.img;
    })
    .finally(() => (commentBtn.disabled = false));
}
function deletePost(postId) {
  console.log(postId);
  const confirmation = window.confirm(
    "Are you sure you want to delete this post?"
  );
  if (confirmation) {
    fetch(`/post/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        document.querySelector(`.feed#${postId}`).outerHTML = "";
      });
  }
}
async function followUser(target) {
  target.disabled = true;
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
    })
    .finally(() => (target.disabled = false));
}
async function unfollowUser(target) {
  target.disabled = true;
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
    })
    .finally(() => (target.disabled = false));
}

function openCommentSection(input, section) {
  if (currentUser) {
    input.classList.remove("hidden");
    input.querySelector("img").src = currentUser.img;
  }
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
  getUserData();
  window.scrollTo(0, 0);
}
function postInteraction(e) {
  const post = e.target.closest(".feed");
  let commentSection;
  let commentInput;
  if (post) {
    commentSection = post.querySelector(".comments");
    commentInput = post.querySelector(".comment-input");
  }
  0;
  // LIKE/UNLIKE //
  if (e.target.classList.contains("uil-heart") && !e.target.disabled) {
    if (!currentUser) {
      window.alert("Login to engage with posts");
      return;
    }

    const postId = post.getAttribute("id");
    if (!e.target.classList.contains("btn-active")) {
      likePost(e.target, post);
    } else {
      unlikePost(postId, post, e.target);
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
  if (e.target.classList.contains("post-click") && !e.target.disabled) {
    commentPost(post, e.target);
  }
  if (e.target.classList.contains("view-comments")) {
    openCommentSection(commentInput, commentSection);
    e.target.classList.add("hidden");
  }
  if (e.target.classList.contains("hide-comments")) {
    closeCommentSection(commentInput, commentSection);
    post.querySelector(".view-comments").classList.remove("hidden");
  }
  if (e.target.classList.contains("liked-by-modal")) {
    const postId = e.target.closest(".feed").getAttribute("id");
    openLikesModal(postId);
  }
  if (e.target.classList.contains("user-click")) {
    goToUser(e.target.getAttribute("id"));
  } else if (e.target.closest(".user-click")) {
    goToUser(e.target.closest(".user-click").getAttribute("id"));
  }
  //Follow
  if (e.target.classList.contains("follow") && !e.target.disabled) {
    followUser(e.target);
  }
  if (e.target.classList.contains("unfollow") && !e.target.disabled) {
    unfollowUser(e.target);
  }
  if (e.target.classList.contains("followingCount")) {
    openFollowModal(e.target.getAttribute("id"), "following");
  }
  if (e.target.classList.contains("followersCount")) {
    openFollowModal(e.target.getAttribute("id"), "followers");
  }
  //Delete
  if (e.target.classList.contains("uil-trash-alt")) {
    deletePost(e.target.getAttribute("id"));
  }
}
async function notificationPost(postId, notificationId) {
  fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, notificationId }),
  })
    .then((response) => response.json())
    .then((postHtml) => {
      getUserData();
      feedContainer.classList.add("hidden");
      createPostDiv.classList.add("hidden");
      singlePost.innerHTML = postHtml;
      singlePost.classList.remove("hidden");
      notifPopup.classList.add("hidden");
      profileContainer.classList.add("hidden");
      window.scrollTo(0, 0);
    });
}
//-----------------------------------------------------------------------

// <=========================== FEED EVENT DELEGATION ===========================> //

usersModal.addEventListener("click", function (e) {
  e.preventDefault();
  const userLink = e.target.closest(".user-click");
  if (e.target.classList.contains("btn--close-modal")) {
    usersModal.classList.add("hidden");
  }
  if (userLink) {
    console.log(userLink.getAttribute("id"));
    goToUser(userLink.getAttribute("id"));
    usersModal.classList.add("hidden");
  }
});
feedContainer.addEventListener("click", async function (e) {
  e.preventDefault();
  postInteraction(e);
});
profileContainer.addEventListener("click", async function (e) {
  e.preventDefault();
  postInteraction(e);
});
singlePost.addEventListener("click", async function (e) {
  e.preventDefault();
  postInteraction(e);
});
searchResultDiv.addEventListener("click", async function (e) {
  e.preventDefault();
  postInteraction(e);
});
//-----------------------------------------------------------------------

// <=========================== NOTIFICATIONS ===========================> //
notifPopup.addEventListener("click", function (e) {
  e.preventDefault();
  const notif = e.target.closest(".notification");
  const notificationId = notif.getAttribute("data-id1");
  if (notif) {
    if (notif.classList.contains("post")) {
      const postId = notif.getAttribute("id");
      notifPopup.classList.add("hidden");
      notificationPost(postId, notificationId);
    } else if (notif.classList.contains("user-profile")) {
      const userId = notif.getAttribute("id");
      notifPopup.classList.add("hidden");
      goToUser(userId);
    }
  }
});
//-----------------------------------------------------------------------

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
  newsContainer.innerHTML = articleContainer.outerHTML;
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
//-----------------------------------------------------------------------

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
