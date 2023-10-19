export class Comment {
  constructor(text, time, sender) {
    this.text = text;
    this.time = new Date().toISOString().split("T")[0];
    this.sender = sender;
  }
}

export class Post {
  constructor(user, postText, time, imgSrc = "") {
    this.user = user;
    this.postText = postText;
    this.time = time;
    this.img = imgSrc;
    this.likes = [];
    this.comments = [];
    this.id = `${user.name}${time}`;
  }
  generateHtml() {
    let likeByHtml;
    if (this.likes.length > 2) {
      likeByHtml = `
            <span><img src=${this.likes[0]?.photo} ></span>
            <span><img src=${this.likes[1]?.photo} ></span>
            <span><img src=${this.likes[2]?.photo} </span>
            <p>Liked by <b>${this.likes[0].name} </b>and ${
        this.likes.length - 1
      } others</p>`;
    } else {
      likeByHtml = `<p>Liked by </b> ${this.likes.length} people</p>`;
    }
    const imgHtml = this.img ? `<img src=${this.img}>` : "";
    const html = `<div class="feed">
        <div class="head">
          <div class="user">
            <div class="profile-photo">
              <img src=${this.user.photo}>
            </div>
            <div class="info">
              <h3>${this.user.name}</h3>
              <small><b>${this.user.country}</b>, ${this.time}</small>
            </div>
          </div>
          <span class="edit">
            <i class="uil uil-ellipsis-h"></i>
          </span>
        </div>
        <div class="photo">
          ${imgHtml}
        </div>
        <div class="caption">
          <p> <b>${this.user.name}: </b> ${this.postText}</p>
        </div>
        <div class="action-buttons">
          <div class="interaction-buttons">
            <span><i class="uil uil-heart"></i></span>
            <span><i class="uil uil-comment-dots" data-item-id=${this.id}></i></span>
            <span><i class="uil uil-share-alt"></i></span>
          </div>
        </div>
        <div class="liked-by">
            ${likeByHtml}
        </div>
        <div class="comment-input hidden" id=${this.id}>
        <form class="container post-comment">
          <div class="profile-photo">
            <img src="./images/userImg/me.jpg" alt="profile-photo">
          </div>
            <input type="text" placeholder="Leave a comment" id="post-comment">
            <input type="submit" value="Comment" class="post">
          </form>
    </div>
        <div class="comments text-muted">View all ${this.comments.length} comments</div>
      </div>`;
    return html;
  }
  ge;
}
