
const mongoose = require("mongoose");
require("dotenv").config();

const ParkingSlot = require("./models/ParkingSlot");
const Reservation = require("./models/Reservation");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully!");

        console.log("ParkingSlot model loaded:", ParkingSlot.modelName);
        console.log("Reservation model loaded:", Reservation.modelName);

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

connectDB();
