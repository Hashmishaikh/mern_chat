import path from 'path';
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

const __dirname = path.resolve();

dotenv.config();
app.use(express.json()); //to parse data from the income data (req.body)
app.use(cookieParser());

// app.get("/", (req, res) => {
//   console.log("Hi this is the chat server");
//   res.send("hi this is the chat server");
// });

app.use("/api/auth", authRouters);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

// add server if i want to use the socket io
server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Running On Port ${PORT}`);
});