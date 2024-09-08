// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectToDatabase from "./config/db";

// dotenv.config();
// const port = process.env.PORT || 8080;
// connectToDatabase();

// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api/ ");
const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist")));

// The "catchall" handler: for any request that doesn't match, send back the index.html file from the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
