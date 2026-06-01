const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

// =====================
// GET ALL NOTES
// =====================
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =====================
// CREATE NOTE
// =====================
router.post("/", async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content
        });

        const savedNote = await newNote.save();
        res.json(savedNote);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =====================
// UPDATE NOTE
// =====================
router.put("/:id", async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content
            },
            { new: true }
        );

        res.json(updatedNote);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =====================
// DELETE NOTE
// =====================
router.delete("/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;