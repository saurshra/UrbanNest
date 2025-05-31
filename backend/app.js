const session = require("express-session");
const mongoSession = require("connect-mongo");
const express = require("express");
const connectDb = require("./utils/db");
const cors = require("cors");
const router = require("./routes/authRoute");
const homeRouter = require("./routes/homeRoute");
const whishListRouter = require("./routes/whishListRoutes");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoSession.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

app.use("/", router);
app.use("/all-homes", homeRouter);
app.use("/", whishListRouter);

const PORT = 7070;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error on server startup", error);
  }
};

startServer();
