import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css/NewNote.css";

export default function NewNote({ darkMode }) {
  const [noteText, setNoteText] = useState("");
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in");

    try {
      await axios.post("http://localhost:5001/api/notes", {
        content: noteText,
        userId,
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to save note", err);
      alert("Error saving note");
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="note-page">
        <div className="note-header">
          <h2>New Note</h2>
          <div className="menu">
            <button onClick={() => setShowMenu(!showMenu)}>⋮</button>
            {showMenu && (
              <div className="menu-options">
                <div onClick={handleSave}>Save</div>
              </div>
            )}
          </div>
        </div>
        <textarea
          className="note-textarea"
          placeholder="Start writing..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
