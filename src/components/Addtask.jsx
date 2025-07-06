import React, { useState } from "react";
import axios from 'axios';
import "./styles.css/Addtask.css";

export default function Addtask({ cards, onAddTopic }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [topic, setTopic] = useState({
    topicName: "",
    difficulty: "Medium",
    cardName: "",
  });

  const handleFlip = (cardName = null) => {
    setSelectedCard(cardName);
    setIsFlipped(true);
  };

  const handleChange = (e) => {
    setTopic({ ...topic, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("You are not logged in!");
    return; 
  }

  const today = new Date();

  const newTopic = {
    ...topic,
    userId, 
    cardName: selectedCard || topic.cardName,
    creationDate: today,
    nextReviewDate: today,
    reviewed: false,
    stopped: false,
    notifications: true,
    reviewHistory: [],
    stability: 2.5,
    reps: 0,
    lapses: 0,
    scheduled_days: 1,
    elapsed_days: 1,
    last_review:today,
  };

  try {
    console.log("Sending topic to backend:", newTopic);
    const res = await axios.post("http://localhost:5001/api/task", newTopic);

     if (res.data.success) {
      const createdTopic = {
        ...newTopic,
        mongoId: res.data.task._id,
      };

      onAddTopic(createdTopic.cardName, createdTopic);
      setTopic({ topicName: "", difficulty: "Medium", cardName: "" });
      setIsFlipped(false);
      alert("Topic created successfully!");
    } else {
      alert("Failed to create topic");
    }
  } catch (err) {
    console.error("Topic creation error:", err.response?.data || err.message);
    alert("Error creating topic");
  }
};


  return (
    <div className="task-wrapper">
      {/* exixting card */}
      {cards.map((card, i) => (
        <div
          className="task-card"
          key={i}
          onClick={() => handleFlip(card.cardName)}
        >
          ➕ {card.cardName}
        </div>
      ))}
      {/* create new card */}
      <div className="task-card" onClick={() => handleFlip(null)}>
        ➕ Create Card
      </div>

      {isFlipped && (
        <div className="task-form-back" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            {!selectedCard && (
              <input
                name="cardName"
                placeholder="Card Name"
                value={topic.cardName || ""}
                onChange={handleChange}
                required
              />
            )}
            <input
              name="topicName"
              placeholder="Topic Name"
              value={topic.topicName}
              onChange={handleChange}
              required
            />
            <select
              name="difficulty"
              value={topic.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Very Hard">Very Hard</option>
            </select>

            <button type="submit">Create Topic</button>
          </form>
        </div>
      )}
    </div>
  );
}
