// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import inventoryRouter from "./routes/inventoryRoute.js";
import insightsRouter from "./routes/insightsRoutes.js";

dotenv.config({ path: "./config.env" });

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/brew-buddy/user", userRouter);
app.use("/api/brew-buddy/auth", authRouter);
app.use("/api/brew-buddy/product", productRouter);
app.use("/api/brew-buddy/order", orderRouter);
app.use("/api/brew-buddy/cart", cartRouter);
app.use("/api/brew-buddy/inventory", inventoryRouter);
app.use("/api/brew-buddy/insights", insightsRouter);

// Create HTTP server and bind it to app
const httpServer = http.createServer(app);

// Socket.IO setup
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // for dev
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// export the server, not just app
export default httpServer;
