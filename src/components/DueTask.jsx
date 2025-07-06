import React, { useEffect, useState } from "react";
import "./styles.css/DueTask.css"; 

const DueTask = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  const fetchDueTasks = async () => {
    const res = await fetch(`http://localhost:5001/api/tasks/due/${userId}`);
    const data = await res.json();
    setTasks(data);
  };

  const handleReview = async (taskId, quality) => {
    await fetch(`http://localhost:5001/api/task/${taskId}/review`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quality })
    });

    fetchDueTasks(); 
  };

  useEffect(() => {
    fetchDueTasks();
  }, [userId]);

  return (
    <div className="due-tasks-container">

      {tasks.length === 0 ? (
        <p className="no-tasks"></p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3 className="task-title">{task.cardName}</h3>
            <p className="task-topic">Topic: {task.topicName}</p>
            <p className="task-date">
              Due: {new Date(task.nextReviewDate).toLocaleDateString()}
            </p>

            <div className="review-buttons">
              <button onClick={() => handleReview(task._id, 0)} className="btn btn-again">Again</button>
              <button onClick={() => handleReview(task._id, 3)} className="btn btn-good">Good</button>
              <button onClick={() => handleReview(task._id, 5)} className="btn btn-easy">Easy</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DueTask;
