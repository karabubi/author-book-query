import { useState } from "react";
import "../App.css";

const SearchForm = ({ onSearch }) => {
  const [authorName, setAuthorName] = useState("");
  const [bookName, setBookName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ authorName, bookName });
  };

  const handleClear = () => {
    setAuthorName("");
    setBookName("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="authorName">Author Name:</label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Enter author's name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="bookName">Book Title:</label>
        <input
          type="text"
          id="bookName"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book title"
        />
      </div>

      <div className="button-group">
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
