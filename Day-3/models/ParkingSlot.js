
const mongoose = require("mongoose");

const parkingSlotSchema = new mongoose.Schema(
    {
        slotNumber: {
            type: String,
            required: [true, "Slot number is required"],
            trim: true
        },

        location: {
            type: String,
            required: [true, "Parking location is required"],
            trim: true
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "bike", "truck"]
        },

        status: {
            type: String,
            enum: ["available", "occupied", "maintenance"],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

// Index for finding available slots by location and vehicle type.
parkingSlotSchema.index({
    location: 1,
    vehicleType: 1,
    status: 1
});

const ParkingSlot = mongoose.model("ParkingSlot", parkingSlotSchema);

module.exports = ParkingSlot;
