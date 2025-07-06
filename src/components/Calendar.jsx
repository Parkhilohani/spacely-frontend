import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css/Calendar.css";

export default function StudyCalendar({ cards }) {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getTopicsForDate = (date) => {
    // Convert clicked date to local-only format YYYY-MM-DD
    const localDateStr =
      date.getFullYear().toString().padStart(4, "0") +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");

    return cards.flatMap((card) =>
      card.topics
        .filter((topic) => {
          const topicDateStr =
            new Date(topic.createdAt)
              .getFullYear()
              .toString()
              .padStart(4, "0") +
            "-" +
            (new Date(topic.createdAt).getMonth() + 1)
              .toString()
              .padStart(2, "0") +
            "-" +
            new Date(topic.createdAt).getDate().toString().padStart(2, "0");

          return topicDateStr === localDateStr;
        })
        .map((topic) => ({
          cardName: card.cardName,
          topicName: topic.topicName,
        }))
    );
  };

  const tileContent = ({ date }) => {
    const topics = getTopicsForDate(date);
    if (topics.length === 0) return null;

    return (
      <div
        className="date-hover-dot"
        onMouseEnter={(e) => {
          setHoveredDate(date);
          setTooltipPosition({ x: e.clientX, y: e.clientY });
        }}
        onMouseLeave={() => setHoveredDate(null)}
      >
        •
      </div>
    );
  };

  const hoveredTopics = hoveredDate && getTopicsForDate(new Date(hoveredDate));

  return (
    <div className="calendar-container">
      <Calendar
        tileContent={tileContent}
        tileClassName={({ date }) =>
          getTopicsForDate(date).length > 0 ? "has-topic" : null
        }
      />

      {hoveredDate && hoveredTopics.length > 0 && (
        <div
          className="calendar-tooltip"
          style={{
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
          }}
        >
          <strong>{hoveredDate.toDateString()}</strong>
          <hr />
          {hoveredTopics.map((t, i) => (
            <div key={i}>
              <b>{t.cardName}</b>: {t.topicName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
