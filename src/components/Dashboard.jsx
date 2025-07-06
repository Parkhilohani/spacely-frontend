import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./styles.css/Dashboard.css";
import Addtask from "./Addtask";
import Alltasks from "./Alltasks";
import Calendar from "./Calendar";
import Setting from "./Setting";
import DueTasks from "./DueTask.jsx";
import DWidgets from "./DWidgets.jsx";
import Navbar from "./Navbar.jsx";
import Logout from "./Logout.jsx";

export default function Dashboard({ darkMode, setDarkMode }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [cards, setCards] = useState([]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [sidebarOpen, setSidebarOpen] = useState(() => {
  //   return window.innerWidth >= 760;
  // });

  // const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSelect = (page) => {
    setActivePage(page);
    
    if(window.innerWidth < 760){
      setSidebarOpen(false);
    }
  };

  // Add Topic Handler
  const handleAddTopic = (cardName, newTopic) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const cardIndex = updatedCards.findIndex((c) => c.cardName === cardName);

      if (cardIndex !== -1) {
        const topicExists = updatedCards[cardIndex].topics.some(
          (t) => t.topicName === newTopic.topicName
        );
        if (!topicExists) {
          updatedCards[cardIndex].topics.push(newTopic);
        }
      } else {
        updatedCards.push({ cardName, topics: [newTopic] });
      }

      return updatedCards;
    });
  };

  const markReviewed = async (cardIndex, topicIndex) => {
    const updated = [...cards];
    const topic = updated[cardIndex].topics[topicIndex];

    if (!topic.mongoId) {
      alert("Cannot mark review: mongoId is missing");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5001/api/review/${topic.mongoId}`,
        {
          rating: 3,
          reviewDate: new Date().toISOString(),
        }
      );

      const dueDate = res.data?.updated?.card?.due;
      if (!dueDate) {
        alert("Review response is missing due date");
        return;
      }

      topic.nextReviewDate = new Date(dueDate).toISOString().split("T")[0];

      const today = new Date().toISOString().split("T")[0];
      if (!topic.reviewHistory.includes(today)) {
        topic.reviewHistory.push(today);
      }

      setCards(updated);
      alert("Review recorded");
    } catch (err) {
      console.error("Review failed:", err.response?.data || err.message);
      alert("Failed to mark review");
    }
  };

  const handleReview = async (task) => {
    try {
      const res = await axios.post(
        `http://localhost:5001/api/review/${task.mongoId}`
      );
      const updated = res.data?.updated;

      const dueDate = updated?.card?.due;
      if (!dueDate) {
        alert("Review response is missing due date");
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      const updatedCards = cards.map((card) => ({
        ...card,
        topics: card.topics.map((topic) =>
          topic.mongoId === task.mongoId
            ? {
                ...topic,
                nextReviewDate: new Date(dueDate).toISOString().split("T")[0],
                reviewHistory: [...(topic.reviewHistory || []), today],
              }
            : topic
        ),
      }));

      setCards(updatedCards);
      alert("Task reviewed!");
    } catch (err) {
      console.error("Review error:", err.response?.data || err.message);
      alert("Failed to review task");
    }
  };


  // ✅ Stop topic
  const StopTopic = (cardIndex, topicIndex) => {
    const updated = [...cards];
    const topic = updated[cardIndex].topics[topicIndex];

    if (!topic.stopped) {
      topic.stopped = true;
      topic.notifications = false;
      alert(
        `Stopped topic "${topic.topicName}" under "${cards[cardIndex].cardName}"`
      );
      setCards(updated);
    }
  };

  // ✅ Email reminder (daily)
  useEffect(() => {
    const scheduleDailyEmail = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(14, 0, 0, 0); // 2:00 PM

      if (now > target) target.setDate(target.getDate() + 1);

      const timeUntilTarget = target - now;

      const timeout = setTimeout(() => {
        const today = new Date().toISOString().split("T")[0];
        const userEmail = localStorage.getItem("email");

        if (!emailNotifications || !userEmail) return;

        cards.forEach((card) => {
          card.topics.forEach((topic) => {
            if (!topic.stopped && topic.nextReviewDate === today) {
              // sendEmail({
              //   toEmail: userEmail,
              //   subject: `Review Reminder: ${topic.topicName}`,
              //   message: `Hello! Please review "${topic.topicName}" in "${card.cardName}" today.\nKeep learning!`,
              // });
            }
          });
        });

        scheduleDailyEmail(); // next day
      }, timeUntilTarget);

      return () => clearTimeout(timeout);
    };

    const cancel = scheduleDailyEmail();
    return cancel;
  }, [cards, emailNotifications]);

  // ✅ Load from backend (initial load)
useEffect(() => {
  const fetchTasks = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await axios.get(`http://localhost:5001/api/tasks/${userId}`);
      const tasks = res.data;

      const grouped = {};
      tasks.forEach((task) => {
        if (!grouped[task.cardName]) grouped[task.cardName] = [];

        // CHANGE THIS LINE ONLY
        grouped[task.cardName].push({ 
          ...task, 
          mongoId: task._id, 
          createdAt: task.createdAt || new Date().toISOString() 
        });
      });

      const cards = Object.entries(grouped).map(([cardName, topics]) => ({
        cardName,
        topics,
      }));

      setCards(cards);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  fetchTasks();
}, []);

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
      <Navbar toggleSidebar={toggleSidebar} />
    
      {/* <Sidebar isOpen={sidebarOpen} onSelect={(page) => {
        setActivePage(page);
        setSidebarOpen(false);
      }} /> */}

      <Sidebar isOpen={sidebarOpen} onSelect={handleSelect} />


      <div className="dashboard-content">
        <h1>{activePage}</h1>

        {activePage === "Dashboard" && (
          <>
            <p>Welcome to your {activePage} page!</p>
            <DWidgets cards={cards}/>
            <DueTasks userId={localStorage.getItem("userId")} />
          </>
        )}

        {activePage === "Add Task" && (
          <Addtask cards={cards} onAddTopic={handleAddTopic} />
        )}

        {activePage === "All Tasks" && (
          <Alltasks
            cards={cards}
            onMarkReviewed={markReviewed}
            onStopTopic={StopTopic}
            onFSRSReview={handleReview}
          />
        )}

        {activePage === "Calendar" && <Calendar cards={cards} />}

        {activePage === "Settings" && (
          <Setting
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
          />
        )}
        {activePage === "Logout" && <Logout />}
      </div>
    </div>
  );
}
