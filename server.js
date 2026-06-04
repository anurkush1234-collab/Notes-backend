const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// ROUTES
// =====================
app.use("/notes", noteRoutes);

// Home route (test)
app.get("/", (req, res) => {
    res.send("Notes API Running 🚀");
});

// =====================
// MONGODB CONNECTION
// =====================
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running");
        });
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });