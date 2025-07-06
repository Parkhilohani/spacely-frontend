import React, { useState } from 'react';
import axios from 'axios';

const ReviewTask = ({ taskId }) => {
  const [rating, setRating] = useState(3);

  const handleReview = async () => {
    const res = await axios.post(`http://localhost:5001/api/review/${taskId}`, {
      rating,
      reviewDate: new Date().toISOString()
    });
    alert('Next Review Scheduled on: ' + new Date(res.data.nextReview).toDateString());
  };

  return (
    <div>
      <select value={rating} onChange={e => setRating(parseInt(e.target.value))}>
        <option value={0}>Again</option>
        <option value={1}>Hard</option>
        <option value={2}>Good</option>
        <option value={3}>Easy</option>
      </select>
      <button onClick={handleReview}>Submit Review</button>
    </div>
  );
};

export default ReviewTask;
