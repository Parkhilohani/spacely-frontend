import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css/NoteView.css";

export default function NoteView({ darkMode }) {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/view/${id}`);
        setNote(res.data);
      } catch (err) {
        console.error("Error fetching note:", err);
        alert("Failed to load note");
      }
    };

    fetchNote();
  }, [id]);

  if (!note) return <div className="note-view-loading">Loading note...</div>;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="note-view-container">
        <button onClick={() => navigate("/dashboard")} className="back-btn">← Back</button>
        <h2 className="note-view-title">Note</h2>
        <div className="note-view-content">
          {note.content}
        </div>
      </div>
    </div>
  );
}
