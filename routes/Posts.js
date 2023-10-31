const PAGE_SIZE = 5;
//FUNCTIONS
async function getPostsByUser(userID) {
  return await Post.find({ "user.userID": userID })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate([
      { path: "likes", model: "User" },
      {
        path: "comments",
        model: "Comment",
        populate: { path: "user", model: "User" },
      },
    ])
    .exec();
}

app.get("/api/feed", async (req, res) => {
  const page = req.query.page || 1;
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .populate([
      { path: "likes", model: "User" },
      {
        path: "comments",
        model: "Comment",
        populate: { path: "user", model: "User" },
      },
    ])
    .exec();

  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id };
  });
  const user = currentUser;
  res.json({ postHtmlList, user });
});

// <============ MY-POSTS ============> //
app.get("/api/my-profile", async (req, res) => {
  const posts = await getPostsByUser(currentUser.userID);
  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id, user: currentUser };
  });
  const user = currentUser;
  const userHtml = user.generateProfileHtml(true);
  res.json({ postHtmlList, user, userHtml });
});

app.get("/api/profile", async (req, res) => {
  const userId = req.headers.authorization.split(" ")[1];
  const posts = await getPostsByUser(userId);
  const user = await User.findOne({
    userID: userId,
  })
    .populate([
      { path: "followers", model: "User" },
      { path: "following", model: "User" },
    ])
    .exec();
  const isFollow = user.followers.includes(currentUser._id);
  const postHtmlList = posts.map((post) => {
    let liked = isContainUser(post.likes, currentUser);
    const html = post.generateHtml(liked);
    return { html: html, id: post.id, user: currentUser };
  });
  const userHtml = user.generateProfileHtml(false, isFollow);
  res.json({ postHtmlList, user, userHtml });
});

app.post("/Post", upload.single("postImage"), async (req, res) => {
  const { postBody } = req.body;
  const imgPath = req.body.imgName ? `./uploads/${req.body.imgName}` : "";
  const post = await createPost(currentUser, postBody, imgPath);
  const html = post.generateHtml();
  currentUser.postCount++;
  await currentUser.save();
  res.json(html);
});
