app.post("/newUser", upload.single("image"), (req, res) => {
  const name = `${req.body.firstname} ${req.body.lastname}`;
  const { country, age, email, password, timeSurfing } = req.body;
  const profileImg = req.file?.path || "./images/profile-photo.png";
  const handle = email.split("@")[0];
  createUser(
    name,
    country,
    age,
    email,
    handle,
    password,
    profileImg,
    timeSurfing
  );
  res.redirect("/community.html");
});

app.post(`/login`, async (req, res) => {
  const { email, password } = req.body;
  currentUser = await findUser(email, password);
  const sessionKey = generateKey();
  if (!currentUser) {
    res.json(null);
    return;
  }
  res.json({ currentUser, sessionKey });
});

app.get("/user", async (req, res) => {
  try {
    const userId = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      userID: userId,
    })
      .populate([
        { path: "followers", model: "User" },
        { path: "following", model: "User" },
      ])
      .exec();
    if (!user) {
      currentUser = null;
      return res.status(404).json({ message: "User not found" });
    }
    currentUser = user;
    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
