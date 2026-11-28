
const mongoose = require("mongoose");
require("dotenv").config();

const ParkingSlot = require("./models/ParkingSlot");
const Reservation = require("./models/Reservation");

const runTests = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected!\n");

        // 1. Explicitly create both indexes
        await ParkingSlot.createIndexes();
        await Reservation.createIndexes();

        console.log("Both custom indexes created!");

        // 2. Create a valid parking slot
        const slot = new ParkingSlot({
            slotNumber: `TEST-${Date.now()}`,
            location: "Ground Floor",
            vehicleType: "car",
            status: "available"
        });

        await slot.save();
        console.log("\nValid parking slot created!");

        // 3. Test invalid parking slot
        const invalidSlot = new ParkingSlot({
            location: "Ground Floor",
            vehicleType: "plane"
        });

        try {
            await invalidSlot.validate();
        } catch (error) {
            console.log("\nInvalid slot rejected:", error.message);
        }

        // 4. Create a valid reservation
        const start = new Date("2026-12-01T10:00:00Z");
        const end = new Date("2026-12-01T12:00:00Z");

        const reservation = new Reservation({
            slotId: slot._id,
            userId: "USER123",
            startTime: start,
            endTime: end,
            status: "confirmed"
        });

        await reservation.save();
        console.log("\nValid reservation created!");

        // 5. Test invalid reservation dates
        const invalidReservation = new Reservation({
            slotId: slot._id,
            userId: "USER456",
            startTime: end,
            endTime: start
        });

        try {
            await invalidReservation.validate();
        } catch (error) {
            console.log("\nInvalid reservation rejected:", error.message);
        }

        // 6. Check for overlapping reservations
        const requestedStart = new Date("2026-12-01T11:00:00Z");
        const requestedEnd = new Date("2026-12-01T13:00:00Z");

        const conflict = await Reservation.findOne({
            slotId: slot._id,
            status: { $in: ["pending", "confirmed"] },
            startTime: { $lt: requestedEnd },
            endTime: { $gt: requestedStart }
        });

        console.log(
            "\nReservation conflict detected:",
            Boolean(conflict)
        );

        // 7. Display custom indexes
        const slotIndexes = await ParkingSlot.collection.indexes();
        const reservationIndexes = await Reservation.collection.indexes();

        console.log("\nParkingSlot indexes:");
        console.log(slotIndexes.map(index => index.name));

        console.log("\nReservation indexes:");
        console.log(reservationIndexes.map(index => index.name));

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("\nMongoDB connection closed.");
    }
};

runTests();
