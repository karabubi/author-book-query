import { useState } from "react";
import "../App.css";

const SearchForm = ({ onSearch }) => {
  const [characterName, setCharacterName] = useState("Harry");
  const [bookName, setBookName] = useState("Prince");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ characterName, bookName });
  };

  const handleClear = () => {
    setCharacterName("");
    setBookName("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="characterName">Character Name:</label>
        <input
          type="text"
          id="characterName"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="Enter Character's name"
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
