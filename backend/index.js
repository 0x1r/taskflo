import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";
dotenv.config();

await mongoose.connect(process.env.DBURL);

const app=express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// for content security and xss attacks and x headers we use helmet
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.set("etag", false);
app.use(express.json());  


app.use("/api/v1",authRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`server listening on port ${process.env.PORT}`)
})