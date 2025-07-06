import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css/DWidgets.css";

export default function DWidgets({ cards }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `http://localhost:5001/api/notes/${userId}`
        );
        setNotes(res.data || []);
      } catch (err) {
        console.error("Failed to load notes", err);
      }
    };

    fetchNotes();
  }, []);

  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    setMenuOpen(null); // close menu
  };

  // Optional: close menu if user clicks outside
  useEffect(() => {
  const handleClickOutside = (event) => {
    const menuElements = document.querySelectorAll(".note-menu, .menu-icon");
    const clickedInside = Array.from(menuElements).some((el) =>
      el.contains(event.target)
    );
    if (!clickedInside) {
      setMenuOpen(null);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  const active = cards.reduce(
    (t, c) => t + c.topics.filter((t) => !t.stopped).length,
    0
  );
  const inactive = cards.reduce(
    (t, c) => t + c.topics.filter((t) => t.stopped).length,
    0
  );

  return (
    <div className="dwidgets-container">
      <div className="note-page-card" onClick={() => navigate("/new-note")}>
        + Note Page
      </div>

      {/* Render notes from backend */}
      {/* {notes.map((note, index) => (
        <div 
          key={note._id || index} 
          className="note-box"
          onClick={() => navigate(`/note/${note._id}`)}   
         >
          <h4>Note {index + 1}</h4>
          <p>{note.content.slice(0, 100)}{note.content.length > 100 ? "..." : ""}</p>
        </div>
      ))} */}

      {notes.map((note, index) => (
        <div key={note._id || index} className="note-box">
          <div className="note-header">
            <h4>Note {index + 1}</h4>
            <div className="note-menu-wrapper">
              <button className="menu-icon" onClick={() => setMenuOpen(index)}>
                ⋮
              </button>
              {menuOpen === index && (
                <div className="note-menu">
                  <div
                    className="note-menu-item"
                    onClick={() => handleDeleteNote(index)}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
          <p onClick={() => navigate(`/note/${note._id}`)}>
            {note.content.slice(0, 100)}
            {note.content.length > 100 ? "..." : ""}
          </p>
        </div>
      ))}

      <div className="status-widget">
        <h3>Status</h3>
        <p> Active: {active}</p>
        <p> Inactive: {inactive}</p>
      </div>
    </div>
  );
}
