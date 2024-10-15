import { useState } from "react";
import SearchForm from "./Components/SearchForm.jsx";
// import Results from "./Components/Results.jsx";

//
// openlibrary.org seems to be down
//
// I just picked a working API
// https://github.com/fedeperin/potterapi
const API_BASE_URL = "https://potterapi-fedeperin.vercel.app/en";

// Endpoints
// GET /[lang]/books
// GET /[lang]/characters
// GET /[lang]/houses
// GET /[lang]/spells

// Param  Recieves  Description
// -----  --------  -----------
// index  number    Returns only one item, the one that on the whole list has the index selected
// max    number    Returns the whole list cropped by the number passed
// page   number    If max is used, you can also use this param to indicate where to start cropping
// search string    Searches in all the items and returns the best matches

const App = () => {
  const [characterResult, setCharacterResults] = useState([]);
  const [booksResult, setBooksResults] = useState([]);

  const handleSearch = async ({ characterName, bookName }) => {
    setCharacterResults([]);
    setBooksResults([]);
    if (!characterName && !bookName) {
      alert("Please enter an Character name or book title.");
      return;
    }

    if (characterName) {
      const url = `${API_BASE_URL}/characters?search=${encodeURIComponent(
        characterName
      )}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        if (!res.headers.get("content-type").includes("application/json")) {
          throw new Error("Response is not in JSON format.");
        }
        const data = await res.json();
        setCharacterResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data from API.");
      }
    }

    if (bookName) {
      const url = `${API_BASE_URL}/books?search=${encodeURIComponent(
        bookName
      )}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        if (!res.headers.get("content-type").includes("application/json")) {
          throw new Error("Response is not in JSON format.");
        }
        const data = await res.json();
        setBooksResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data from API.");
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Character and Book Query</h1>
        <p>
          Enter the name of an Character to find all their books, or enter a
          book title to find all its Characters.
        </p>
      </header>

      <main>
        <SearchForm onSearch={handleSearch} />
        <p style={{ fontFamily: "monospace" }}>
          {JSON.stringify(characterResult, null, 2)}
        </p>
        <p style={{ fontFamily: "monospace" }}>
          {JSON.stringify(booksResult, null, 2)}
        </p>
        {/* I did not handle this */}
        {/* <Results results={results} type={searchType} /> */}
      </main>

      <footer>&copy; 2024 Harry Potter Book Query : Alkarabubi</footer>
    </div>
  );
};

export default App;
