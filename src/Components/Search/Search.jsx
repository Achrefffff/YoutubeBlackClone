import React, { useState } from "react";
import search_icon from "../../assets/search.png";
import "../Navbar/Navbar.css";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Clic sur l'icône de recherche !");
    if (searchQuery.trim() !== "") {
      console.log("Recherche en cours avec la requête :", searchQuery);
      onSearch(searchQuery);
    }
  };

  

  return (
    <div className="nav-middle flex-div search-box">
      <input
        type="text"
        placeholder="deee"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        
      />
      <img src={search_icon} alt="" onClick={handleSearch} />
      <button onClick={handleSearch}></button>
    </div>
  );
};

export default Search;
