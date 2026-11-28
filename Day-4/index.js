
const express = require("express");
const requestLogger = require("./middleware/requestLogger");
const gardeningRoutes = require("./routes/gardeningRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(requestLogger);

// API routes
app.use("/api/gardening", gardeningRoutes);

// Health-check route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "GardenCast API is running 🌱"
    });
});

// Centralized error handler MUST be last
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`GardenCast server running on port ${PORT}`);
});
