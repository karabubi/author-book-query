import { useState } from "react";
import SearchForm from "./Components/SearchForm.jsx";
import Results from "./Components/Results.jsx";

const App = () => {
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState("");

  const handleSearch = async ({ authorName, bookName }) => {
    setResults([]);
    if (!authorName && !bookName) {
      alert("Please enter an author name or book title.");
      return;
    }

    try {
      let res;
      if (authorName && bookName) {
        setSearchType("books-authors");
        res = await fetch(
          `https://openlibrary.org/search.json?author=${encodeURIComponent(
            authorName
          )}&title=${encodeURIComponent(bookName)}`
        );
      } else if (authorName) {
        setSearchType("books");
        res = await fetch(
          `https://openlibrary.org/search.json?author=${encodeURIComponent(
            authorName
          )}`
        );
      } else if (bookName) {
        setSearchType("authors");
        res = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(
            bookName
          )}`
        );
      }

      const data = await res.json();

      if (searchType === "books") {
        const books = data.docs.slice(0, 20).map((book) => ({
          title: book.title,
          author: book.author_name?.[0] || "Unknown", // added author name
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
        }));
        setResults(books);
      } else {
        const authors = [
          ...new Set(data.docs.flatMap((book) => book.author_name)),
        ].map((author) => ({ name: author }));
        setResults(authors);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from Open Library.");
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Author and Book Query</h1>
        <p>
          Enter the name of an author to find all their books, or enter a book
          title to find all its authors.
        </p>
      </header>

      <main>
        <SearchForm onSearch={handleSearch} />
        <Results results={results} type={searchType} />
      </main>

      <footer>&copy; 2024 Author Book Query : Alkarabubi</footer>
    </div>
  );
};

export default App;
