
const express = require("express");
const router = express.Router();

const {
    createNote,
    getNotes,
    getNoteById,
    deleteNote
} = require("../controllers/noteController");

// Create a note
router.post("/", createNote);

// Get all notes
router.get("/", getNotes);

// Get a specific note
router.get("/:id", getNoteById);

// Delete a specific note
router.delete("/:id", deleteNote);

module.exports = router;
