import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRouters from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";
// const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();
app.use(express.json()); //to parse data from the income data (req.body)
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("Hi this is the chat server");
  res.send("hi this is the chat server");
});

app.use("/api/auth", authRouters);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoutes);

// add server if i want to use the socket io
server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Running On Port ${PORT}`);
});