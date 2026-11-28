
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        slotId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ParkingSlot",
            required: [true, "Parking slot reference is required"]
        },

        userId: {
            type: String,
            required: [true, "User ID is required"],
            trim: true
        },

        startTime: {
            type: Date,
            required: [true, "Reservation start time is required"]
        },

        endTime: {
            type: Date,
            required: [true, "Reservation end time is required"],
            validate: {
                validator: function (value) {
                    return !this.startTime || value > this.startTime;
                },
                message: "End time must be after start time"
            }
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

// Index for checking overlapping reservations of a parking slot.
reservationSchema.index({
    slotId: 1,
    status: 1,
    startTime: 1,
    endTime: 1
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
