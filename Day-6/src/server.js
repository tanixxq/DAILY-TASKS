
require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const authRoutes = require("./routes/authRoutes");
const { users } = require("./controllers/authController");
const libraryRoutes = require("./routes/libraryRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Library Lending API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/library", libraryRoutes);

const seedLibrarian = async () => {
  const email = process.env.LIBRARIAN_EMAIL?.trim().toLowerCase();
  const password = process.env.LIBRARIAN_PASSWORD;

  if (!email || !password) {
    throw new Error("Librarian credentials are missing from .env");
  }

  if (password.length < 12) {
    throw new Error("Demo librarian password must be at least 12 characters");
  }

  const existing = users.find((user) => user.email === email);

  if (!existing) {
    users.push({
      id: randomUUID(),
      name: "Demo Librarian",
      email,
      password: await bcrypt.hash(password, 10),
      role: "librarian",
    });
  }
};

const startServer = async () => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters");
  }

  await seedLibrarian();

  const port = process.env.PORT || 5050;

  app.listen(port, () => {
    console.log(`Library Lending API running on port ${port}`);
    console.log("Demo librarian account ready");
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
