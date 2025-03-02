

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change this if your MySQL username is different
  password: "Suggest@password", // Replace with your MySQL password
  database: "book_database" // Replace with your actual database name
});

// Check MySQL Connection
db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database!");
});

// Default Route (Check if Server is Running)
app.get("/", (req, res) => {
    res.send(" Backend is running! Use /books to see data.");
});

// Fetch all books from the database
app.get("/books", (req, res) => {
    db.query("SELECT * FROM books", (err, results) => {
        if (err) {
            console.error("Error fetching books:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(results);
        }
    });
});


// API to Add a New Book
app.post("/books", (req, res) => {
    const { title, author, description } = req.body;
    if (!title || !author || !description) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = "INSERT INTO books (title, author, description) VALUES (?, ?, ?)";
    db.query(sql, [title, author, description], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.status(201).json({ message: "Book added successfully!", id: result.insertId });
        }
    });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
// API to delete a book by ID
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    
    const sql = "DELETE FROM books WHERE id = ?";
    db.query(sql, [bookId], (err, result) => {
        if (err) {
            console.error("Error deleting book:", err);
            res.status(500).json({ error: "Database error" });
        } else {
            res.json({ message: "Book deleted successfully!" });
        }
    });
});
