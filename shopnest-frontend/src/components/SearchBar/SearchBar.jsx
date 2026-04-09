import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="d-flex"
      style={{ width: "100%", maxWidth: "500px" }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button className="btn btn-warning ms-2">🔍</button>
    </form>
  );
};

export default SearchBar;
