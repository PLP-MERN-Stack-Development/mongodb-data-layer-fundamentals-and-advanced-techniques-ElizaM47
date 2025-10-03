// insert_books.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // change if using Atlas
const dbName = "plpeliza_bookstore";
const collectionName = "books";

const books = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, price: 12.99, in_stock: true, pages: 336, publisher: "J. B. Lippincott & Co." },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", published_year: 1925, price: 9.99, in_stock: true, pages: 180, publisher: "Charles Scribner's Sons" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", published_year: 1951, price: 8.99, in_stock: true, pages: 224, publisher: "Little, Brown and Company" },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", published_year: 1988, price: 10.99, in_stock: true, pages: 197, publisher: "HarperOne" },
  { title: "Moby Dick", author: "Herman Melville", genre: "Adventure", published_year: 1851, price: 12.50, in_stock: false, pages: 635, publisher: "Harper & Brothers" },
  { title: "Wuthering Heights", author: "Emily Brontë", genre: "Gothic Fiction", published_year: 1847, price: 9.99, in_stock: true, pages: 342, publisher: "Thomas Cautley Newby" },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", published_year: 1813, price: 7.99, in_stock: true, pages: 432, publisher: "T. Egerton, Whitehall" },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1954, price: 19.99, in_stock: true, pages: 1178, publisher: "Allen & Unwin" },
  { title: "Animal Farm", author: "George Orwell", genre: "Political Satire", published_year: 1945, price: 8.50, in_stock: false, pages: 112, publisher: "Secker & Warburg" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", published_year: 1997, price: 14.99, in_stock: true, pages: 309, publisher: "Bloomsbury" }
];

async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB server");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(Collection already has ${count} documents. Dropping collection...);
      await collection.drop();
      console.log("Collection dropped successfully");
    }

    const result = await collection.insertMany(books);
    console.log(${result.insertedCount} books were inserted successfully.);

  } catch (err) {
    console.error("❌ Error occurred:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

insertBooks().catch(console.error);