import React from "react";
import "./styles.css/Alltasks.css";

// ✅ Helper function to format date
const formatDate = (date) => {
  if (!date) return "Not set";
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} | ${hours}:${minutes}`;
};

export default function Alltasks({ cards, onMarkReviewed, onStopTopic, onFSRSReview }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="all-tasks">
      {cards.map((card, cardIndex) => (
        <div className="card-section" key={cardIndex}>
          <h2>{card.cardName}</h2>

          {card.topics.length === 0 ? (
            <p>No topics yet.</p>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Difficulty</th>
                  <th>Reviewed Today</th>
                  <th>Next Review</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {card.topics.map((topic, topicIndex) => {
                  const isDue = new Date(topic.nextReviewDate).toISOString().split("T")[0] === today;
                  const isFuture = new Date(topic.nextReviewDate) > new Date();
                  const reviewedToday = topic.reviewHistory?.includes(today);

                  let rowClass = "row-default";
                  if (topic.stopped) rowClass = "row-stopped";
                  else if (isDue) rowClass = "row-due";
                  else if (isFuture) rowClass = "row-future";

                  return (
                    <tr key={topicIndex} className={rowClass}>
                      <td data-label="Topic">{topic.topicName}</td>
                      <td data-label="Difficulty">{topic.difficulty}</td>
                      <td data-label="Reviewed Today">{reviewedToday ? "Yes" : "No"}</td>
                      <td data-label="Next Review">
                        {topic.nextReviewDate ? (
                          <span>
                            {isDue ? (
                              <strong className="today-highlight">Today</strong>
                            ) : (
                              formatDate(topic.nextReviewDate)
                            )}
                          </span>
                        ) : (
                          "Not set"
                        )}
                      </td>
                      <td data-label="Actions">
                        {!topic.stopped && (
                          <>
                            <button
                              className="btn-review"
                              onClick={() => {
                                const confirmReview = window.confirm("Next Review notification will be sent on Email.");
                                if(confirmReview){
                                  onMarkReviewed(cardIndex, topicIndex);                                }
                              }}
                            >
                              Review Done
                            </button>
                            {/* <button
                              className="btn-fsrs"
                              onClick={() => onFSRSReview(topic)}
                            >
                              FSRS Review
                            </button> */}
                          </>
                        )}
                        <button
                          className="btn-stop"
                          onClick={() => {
                            const confirmStop = window.confirm(
                              `Are you sure you want to stop "${topic.topicName}" in "${card.cardName}" ?`
                            );
                            if (confirmStop) onStopTopic(cardIndex, topicIndex);
                          }}
                        >
                          {topic.stopped ? "Stopped" : "Stop"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
