import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import aa from '../../assets/aa.jpg'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_KEY } from "../../data";

const Navbar = ({ setSidebar }) => {
  const [termeRecherche, setTermeRecherche] = useState(""); // Terme de recherche
  const [resultatsRecherche, setResultatsRecherche] = useState([]); // Résultats de recherche

  
 

  useEffect(() => {
    const recupererDonnees = async () => {
      if (termeRecherche) {
        const reponse = await fetch(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${termeRecherche}&key=${API_KEY}`
        );
        const donnees = await reponse.json();
        setResultatsRecherche(donnees.items || []); // Gère l'absence potentielle d'éléments
      } else {
        setResultatsRecherche([]);
      }
    };

    recupererDonnees();
  }, [termeRecherche]); // Re-exécuter sur changement de termeRecherche

  const gererSoumissionRecherche = (event) => {
    event.preventDefault(); // Empêche le comportement de soumission de formulaire par défaut

    const fetchData = async () => {
      const reponse = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${termeRecherche}&key=${API_KEY}`
      );
      const donnees = await reponse.json();
      setResultatsRecherche(donnees.items || []); // Gère l'absence potentielle d'éléments
    };

    fetchData();
  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          src={menu_icon}
          alt=""
          className="menu-icon"
          onClick={() =>
            setSidebar((precedent) => (precedent === false ? true : false))
          }
        />
        <Link to="/">
          <img src={aa} alt="" className="logo" />{" "}
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <form
          onSubmit={gererSoumissionRecherche}
          className="search-box flex-div "
        >
          <input
            type="text"
            placeholder="Rechercher sur YouTube"
            value={termeRecherche}
            onChange={(event) => setTermeRecherche(event.target.value)}
          />
          <img src={search_icon} alt="" />
        </form>
        {resultatsRecherche.length > 0 && (
          <ul className="search-results">
            {resultatsRecherche.map((item) => (
              <li key={item.id.videoId}>
                <Link to={`/watch/${item.id.videoId}`}>
                  {item.snippet.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;

