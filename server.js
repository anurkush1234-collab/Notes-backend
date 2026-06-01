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
mongoose.connect(
    "mongodb+srv://anurkush1234_db_user:Anurag123@cluster0.ke2hsu1.mongodb.net/notesDB?retryWrites=true&w=majority"
)
    .then(() => {
        console.log("MongoDB Connected");

        // server only starts after DB connection
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });

    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });