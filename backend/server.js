const express = require('express');
require('dotenv').config();
require("./DBConfig");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require('cors');
const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server running in the port ${PORT}`);
})