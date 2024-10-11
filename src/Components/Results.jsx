import "../App.css";

const Results = ({ results, type }) => {
  return (
    <div className="resultsContainer">
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        results.map((result, index) => (
          <div key={index} className="result">
            {type === "books" && (
              <>
                <img
                  src={result.cover || "https://via.placeholder.com/150"}
                  alt={result.title}
                />
                <p>
                  <strong>Title:</strong> {result.title}
                </p>
                <p>
                  <strong>Author:</strong> {result.author || "Unknown"}
                </p>
              </>
            )}
            {type === "authors" && <p>{result.name}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Results;
