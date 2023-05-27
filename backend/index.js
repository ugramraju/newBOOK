const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
const userRoutes = require("./Routers/userRoutes");
const notesRoutes = require("./Routers/notesRoutes")
app.use(cors({
    origin: "https://leafy-kitten-16d7e4.netlify.app",
    credentials:true
}));
const Port = process.env.PORT || 8000;
app.listen((Port), ()=>{
    console.log(`App Listen On ${Port}`)
});
app.use("/api",notesRoutes);
app.use("/api",userRoutes);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected Successfully");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });

