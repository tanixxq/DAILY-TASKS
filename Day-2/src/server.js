
const express = require("express");
require("dotenv").config();

const app = express();

const noteRoutes = require("./routes/noteRoutes");

app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Secure Notes API is running"
    });
});

// Notes API routes
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
