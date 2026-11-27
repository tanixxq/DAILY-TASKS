# Secure Notes API

A REST API built using Node.js and Express.js for managing private notes with encryption and user-based access control.

## Overview

The Secure Notes API allows users to create, retrieve, and delete private notes. It demonstrates REST API design, input validation, encryption concepts, and basic access control.

Note content is encrypted before being stored using Node.js's built-in cryptography module.

## Technology Stack

- Node.js
- Express.js
- dotenv
- Node.js Crypto module
- Postman
- Git and GitHub

## Project Structure

```text
Day-2/
├── src/
│   ├── server.js
│   ├── routes/
│   │   └── noteRoutes.js
│   ├── controllers/
│   │   └── noteController.js
│   └── utils/
│       └── encryption.js
├── screenshots/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

Base URL: `http://localhost:5050`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes` | Retrieve all user's notes |
| GET | `/api/notes/:id` | Retrieve a specific note |
| DELETE | `/api/notes/:id` | Delete a specific note |

### 1. Create a Note

**POST** `/api/notes`

Request body:

```json
{
  "title": "My First Note",
  "content": "This is my secret information"
}
```

Required header:

`x-user-id: user1`

Success response: `201 Created`

### 2. Retrieve All Notes

**GET** `/api/notes`

Required header:

`x-user-id: user1`

Success response: `200 OK`

Returns only notes belonging to the requesting user.

### 3. Retrieve a Specific Note

**GET** `/api/notes/:id`

Required header:

`x-user-id: user1`

Success response: `200 OK`

Returns the requested note if it belongs to the requesting user.

### 4. Delete a Note

**DELETE** `/api/notes/:id`

Required header:

`x-user-id: user1`

Success response: `200 OK`

Deletes the requested note if it belongs to the requesting user.

## HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Note created successfully |
| 400 | Invalid or missing input |
| 401 | User authentication information missing |
| 404 | Note not found or not accessible |
| 500 | Internal server error |

### Example Error Response

```json
{
  "success": false,
  "message": "Title and content are required"
}
```

## Security Implementation

### Encryption

Note content is encrypted using AES-256-GCM through Node.js's built-in `crypto` module.

The implementation uses:

- A 256-bit secret key.
- A randomly generated 12-byte initialization vector (IV) for every encryption operation.
- An authentication tag to verify data integrity.

Encrypted content is decrypted only when returning notes to their owners.

### Access Control

Each note is associated with a user ID.

The API checks ownership before allowing a user to retrieve or delete a note.

For this assignment, the user ID is supplied through the `x-user-id` request header to demonstrate access-control logic.

**Note:** This is simulated authentication, not production-grade authentication. A production application should use verified JWT tokens or secure sessions.

## Input Validation

The API validates incoming note data:

- Title must be a non-empty string.
- Content must be a non-empty string.
- Missing user identification is rejected.
- Users cannot access notes belonging to other users.

## Design Decisions and Trade-offs

1. **AES-256-GCM encryption:** Provides confidentiality and integrity verification. Encryption and decryption require secure management of the same secret key.

2. **In-memory storage:** Keeps the implementation simple and focused on REST API design. However, notes are lost whenever the server restarts. A production application would use persistent database storage.

3. **User ID header:** Demonstrates ownership checks without implementing a complete authentication system. However, clients can spoof this header, so it must be replaced with verified authentication in production.

4. **404 for inaccessible notes:** Prevents the API from revealing whether a note exists but belongs to another user.

5. **No encryption key in source code:** The secret key is stored in environment variables to avoid exposing sensitive configuration in the repository.

## Setup Instructions

### Prerequisites

- Node.js
- npm
- Postman (for API testing)

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the Day-2 directory:

```bash
cd secure-notes-api/Day-2
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a reference.

Generate a secure encryption key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add the generated key to `.env`:

```env
PORT=5050
ENCRYPTION_KEY=your_generated_64_character_hex_key
```

### Run the Application

```bash
npm run dev
```

The server will run at:

`http://localhost:5050`

Health check:

`GET http://localhost:5050/`

## API Testing

All four endpoints were tested using Postman.

Additional security and validation tests included:

- Creating a note successfully.
- Retrieving all notes.
- Retrieving a note by ID.
- Deleting a note.
- Preventing access from another user.
- Rejecting empty title and content.
- Rejecting requests without user identification.

Screenshots of the API testing results are available in the `screenshots/` directory.

## Limitations

- Notes are stored in memory and are not persistent.
- Authentication is simulated through a request header.
- A production deployment would require a persistent database, verified authentication, HTTPS, and secure encryption-key management.

## Author

**Tanishq Singhal**

Day 2 – REST API Design  
Secure Notes App Assignment