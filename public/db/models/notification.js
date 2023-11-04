import mongoose from "mongoose";
import { generateTime } from "./post.js";
import moment from "moment";

const notificationSchema = new mongoose.Schema({
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  notifType: String,
  gotoId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

notificationSchema.methods.generateHtml = function () {
  const timeAgo = generateTime(this);
  const html = `<div class="notification ${this.notifType}" id=${this.gotoId}>
  <div class="profile-photo">
    <img src=${this.fromUser.img} alt="">
  </div>
  <div class="notification-body">
    <b>${this.fromUser.name} </b> ${this.text}
    <small class="text-muted"> ${timeAgo}</small>
  </div>
</div>`;
  return html;
};
export const Notification = mongoose.model("Notification", notificationSchema);

export async function createNotification(toUser, fromUser, actionText, gotoId, notifType) {
  const notification = new Notification({
    toUser: toUser,
    fromUser: fromUser,
    text: `${actionText}`,
    notifType: `${notifType}`,
    gotoId: gotoId,
  });
  return await notification.save();
}
