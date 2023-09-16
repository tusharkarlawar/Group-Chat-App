// Modules
const cors = require("cors");
// const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();

// Routes
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const passwordRouter = require("./routes/passwordRoutes");

// Database and other utilities
const sequelize = require("./utils/database");
const { archiveChats } = require("./archivechats/archivechats");

// Models
const User = require("./models/userModel");
const Message = require("./models/messageModel");
const PasswordModel = require("./models/forgotPasswordModel");

// Starting app
const app = express();
app.use(cors());

app.use("/chat", (req, res) => {
  res
    .setHeader(
      "Content-Security-Policy",

      "script-src https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.2/axios.min.js https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js http://localhost:3000/chat/js/signup.js http://localhost:3000/chat/js/login.js http://localhost:3000/chat/js/welcomePage.js http://localhost:3000/socket.io/socket.io.js",
      "img-src  https://img.icons8.com/color/256/weixing.png"
    )
    .sendFile(path.join(__dirname, `public${req.url}`));
});



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/password", passwordRouter);



// For handling routes which are not defined

User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(PasswordModel);
PasswordModel.belongsTo(User);

sequelize.sync().then(()=>{
  app.listen(3000,()=>{
      console.log('server is running on port 3000');
  });
})