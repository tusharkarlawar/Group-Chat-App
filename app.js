// Modules
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");


// dotenv.config({ path: "./config.env" });
dotenv.config({ path: "./aws.env" });

// Routes
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const groupRouter = require("./routes/groupRoutes");
const passwordRouter = require("./routes/passwordRoutes");

// Database and other utilities
const sequelize = require("./utils/database");
const { archiveChats } = require("./archivechats/archivechats");

// Models
const User = require("./models/userModel");
const Message = require("./models/messageModel");
const PasswordModel = require("./models/forgotPasswordModel");
const Group = require("./models/groupModel");
const userGroup = require("./models/userGroup");

// Starting app
const app = express();
app.use(cors());

// app.use(
//   cors({
//     origin: "http://127.0.0.1:3000",
//   })
// );

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/password", passwordRouter);



User.hasMany(Message);
Message.belongsTo(User);

User.hasMany(PasswordModel);
PasswordModel.belongsTo(User);

User.belongsToMany(Group, { through: userGroup });
Group.belongsToMany(User, { through: userGroup });

sequelize.sync().then(()=>{
  //https.createServer({key:privateKey,cert:certificate}, app).listen(process.env.PORT || 3000);
  app.listen(3000,()=>{
      console.log('server is running on port 3000');
  });
})

