
const { encrypt, decrypt } = require("../utils/encryption");
const crypto = require("crypto");

// Temporary in-memory storage
const notes = [];

// Create a new note
const createNote = (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const encryptedContent = encrypt(content);

        const note = {
            id: crypto.randomUUID(),
            userId,
            title: title.trim(),
            content: encryptedContent
        };

        notes.push(note);

        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: {
                id: note.id,
                title: note.title,
                content
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create note"
        });
    }
};

// Get all notes belonging to the user
const getNotes = (req, res) => {
    const userId = req.headers["x-user-id"];

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User authentication required"
        });
    }

    const userNotes = notes
        .filter(note => note.userId === userId)
        .map(note => ({
            id: note.id,
            title: note.title,
            content: decrypt(note.content)
        }));

    return res.status(200).json({
        success: true,
        data: userNotes
    });
};

// Get a specific note
const getNoteById = (req, res) => {
    const userId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User authentication required"
        });
    }

    const note = notes.find(
        note => note.id === id && note.userId === userId
    );

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    return res.status(200).json({
        success: true,
        data: {
            id: note.id,
            title: note.title,
            content: decrypt(note.content)
        }
    });
};

// Delete a specific note
const deleteNote = (req, res) => {
    const userId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User authentication required"
        });
    }

    const noteIndex = notes.findIndex(
        note => note.id === id && note.userId === userId
    );

    if (noteIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    notes.splice(noteIndex, 1);

    return res.status(200).json({
        success: true,
        message: "Note deleted successfully"
    });
};

module.exports = {
    createNote,
    getNotes,
    getNoteById,
    deleteNote
};
