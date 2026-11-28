# Day 3 – MongoDB Schema Design & Indexes

## Smart Parking Service

### Overview

This project implements MongoDB schemas for a Smart Parking Service using Node.js and Mongoose.

The system manages parking slot availability and reservations while validating booking information and identifying overlapping reservations.

## 1. Project Structure

```text
Day-3/
├── models/
│   ├── ParkingSlot.js
│   └── Reservation.js
├── .env
├── index.js
├── test.js
├── package.json
├── package-lock.json
└── README.md
```

## 2. Database Entities

### ParkingSlot

Represents an individual parking space.

| Field | Type | Validation |
|---|---|---|
| slotNumber | String | Required |
| location | String | Required |
| vehicleType | String | car, bike, truck |
| status | String | available, occupied, maintenance |

### Reservation

Represents a user's booking of a parking space.

| Field | Type | Validation |
|---|---|---|
| slotId | ObjectId | Required, references ParkingSlot |
| userId | String | Required |
| startTime | Date | Required |
| endTime | Date | Required, must be after startTime |
| status | String | pending, confirmed, cancelled, completed |

Both schemas use Mongoose timestamps to automatically maintain `createdAt` and `updatedAt`.

## 3. Relationship Strategy

The system uses a **one-to-many relationship** between ParkingSlot and Reservation.

- One parking slot can have multiple reservations over time.
- Each reservation belongs to exactly one parking slot.
- The relationship is maintained through an ObjectId reference (`slotId`) in the Reservation collection.

Separate collections were chosen instead of embedding reservations inside parking slots because reservations can grow over time and need independent querying and management.

## 4. Indexing Strategy

Two compound indexes have been implemented.

### Index 1 – ParkingSlot

```javascript
{
    location: 1,
    vehicleType: 1,
    status: 1
}
```

**Purpose:** Improves queries that search for available parking spaces based on location, vehicle type, and status.

**Example query:**

```javascript
ParkingSlot.find({
    location: "Ground Floor",
    vehicleType: "car",
    status: "available"
});
```

**Trade-off:** Requires additional storage and increases write overhead when indexed fields are modified.

### Index 2 – Reservation

```javascript
{
    slotId: 1,
    status: 1,
    startTime: 1,
    endTime: 1
}
```

**Purpose:** Helps identify existing reservations for a particular parking slot and narrow down potential time conflicts.

**Example query:**

```javascript
Reservation.findOne({
    slotId: requestedSlotId,
    status: { $in: ["pending", "confirmed"] },
    startTime: { $lt: requestedEndTime },
    endTime: { $gt: requestedStartTime }
});
```

**Trade-off:** Requires additional storage and index maintenance during inserts and updates. The end-time condition may still require filtering after the index scan.

## 5. Reservation Conflict Handling

The system checks for overlapping reservations using the following conditions:

- Existing reservation start time must be before the requested end time.
- Existing reservation end time must be after the requested start time.

Both conditions must be satisfied for a conflict to exist.

Schema validation also ensures that the reservation's end time is later than its start time.

**Concurrency consideration:** The conflict query alone does not prevent simultaneous booking requests from passing the check. A production implementation would require additional concurrency protection, such as transaction-based serialization or a reservation-locking strategy.

## 6. Setup Instructions

### Prerequisites

- Node.js
- MongoDB Atlas account
- MongoDB connection string

### Installation

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
```

### Run the application

```bash
npm start
```

### Run validation and database tests

```bash
npm test
```

The test script verifies:
- Successful MongoDB connection.
- ParkingSlot creation.
- Invalid ParkingSlot rejection.
- Reservation creation.
- Invalid reservation date rejection.
- Reservation conflict detection.
- Index creation and verification.

## 7. Testing Results

The implementation was tested successfully against MongoDB Atlas.

| Test | Result |
|---|---|
| MongoDB connection | Passed |
| Valid parking slot creation | Passed |
| Invalid parking slot validation | Passed |
| Valid reservation creation | Passed |
| Invalid reservation validation | Passed |
| Reservation conflict detection | Passed |
| ParkingSlot index verification | Passed |
| Reservation index verification | Passed |

The created documents and indexes were also verified using MongoDB Compass.

## 8. Design Decisions Summary

- Used separate collections for parking slots and reservations.
- Used ObjectId references to establish relationships.
- Implemented Mongoose schema validation and timestamps.
- Added two compound indexes for common parking and reservation queries.
- Used overlap detection to identify reservation conflicts.
- Documented the concurrency limitation of application-level conflict checks.

---

**Technologies:** Node.js, MongoDB Atlas, Mongoose, dotenv.
