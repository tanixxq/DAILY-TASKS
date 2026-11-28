
const express = require("express");
const { randomUUID } = require("crypto");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Demo library inventory
const books = [
  { id: "book-1", title: "Atomic Habits", author: "James Clear", available: true },
  { id: "book-2", title: "The Alchemist", author: "Paulo Coelho", available: true },
  { id: "book-3", title: "1984", author: "George Orwell", available: true },
];

// Demo borrowed books for overdue reminder testing
const loans = [
  {
    id: "loan-1",
    member: "Demo Member",
    book: "1984",
    dueDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    status: "borrowed",
  },
];

const holds = [];

// All library routes require authentication
router.use(authenticateToken);

// View books
router.get("/books", (req, res) => {
  res.json(books);
});

// Place a hold
router.post("/holds", (req, res) => {
  const { bookId } = req.body;

  const book = books.find((item) => item.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.available) {
    return res.status(409).json({ message: "Book is not available" });
  }

  book.available = false;

  const hold = {
    id: randomUUID(),
    userId: req.user.id,
    bookId: book.id,
    bookTitle: book.title,
    status: "active",
    createdAt: new Date().toISOString(),
  };

  holds.push(hold);

  res.status(201).json({
    message: "Book hold created",
    hold,
  });
});

// View only your own holds
router.get("/holds/my", (req, res) => {
  const myHolds = holds.filter(
    (hold) => hold.userId === req.user.id
  );

  res.json(myHolds);
});

// Cancel a hold with an ownership check
router.patch("/holds/:id/cancel", (req, res) => {
  const hold = holds.find((item) => item.id === req.params.id);

  if (!hold) {
    return res.status(404).json({ message: "Hold not found" });
  }

  if (hold.userId !== req.user.id) {
    return res.status(403).json({
      message: "You cannot modify another member's hold",
    });
  }

  if (hold.status !== "active") {
    return res.status(409).json({ message: "Hold is not active" });
  }

  hold.status = "cancelled";

  const book = books.find((item) => item.id === hold.bookId);
  if (book) book.available = true;

  res.json({ message: "Hold cancelled successfully", hold });
});

// Only librarians can view overdue reminder previews
router.post(
  "/reminders/overdue",
  authorizeRole("librarian"),
  (req, res) => {
    const now = Date.now();

    const overdueLoans = loans.filter(
      (loan) =>
        loan.status === "borrowed" &&
        new Date(loan.dueDate).getTime() < now
    );

    res.json({
      message: "Overdue reminder preview generated",
      count: overdueLoans.length,
      reminders: overdueLoans,
    });
  }
);

module.exports = router;
