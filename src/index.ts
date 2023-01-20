import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";

import healthRoutes from "./routes/health";
import productRoutes from "./routes/products";
import authRoutes from "./routes/auth";
import passport from "passport";
import configPassport from "./config/passport";

dotenv.config();

const app = express();

app.use(morgan("dev"));

/**
 * MongoDB Configuration
 */
require("./config/database");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore({
  uri: "mongodb://PlugHubAdmin:password@localhost:27017/plug_hub",
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: store,
  })
);

/**
 * Passport Authentication
 */
configPassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "POST, PATCH, PUT, DELETE, GET");
//     return res.status(200).json({});
//   }
// });

app.use("/health", healthRoutes);
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error("Not found");
  error["status"] = 404;
  next(error);
});

app.use((error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});

export default app;
