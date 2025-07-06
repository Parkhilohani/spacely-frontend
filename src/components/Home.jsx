import React from "react";
import bgImage from '../assets/h.png';
import "./styles.css/Home.css";
import { useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { FaRegCalendarAlt } from "react-icons/fa";

// FeatureCard Component
const FeatureCard = ({ icon, text }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <p>{text}</p>
  </div>
);

// Step Component
const Step = ({ title, desc }) => (
  <div className="step">
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

// Main Home Page
export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section 
        className="hero"
        style={{
          background: `url(${bgImage}) center center / cover no-repeat`,
        }}
      >
        <h1>From Procrastination to Productivity</h1>
        <p className="tagline">Your personal smart study assistant.</p>
        <button className="hero-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Spacely?</h2>
        <div className="features-grid" onClick={() => alert("Firstly you need to login")}>
          <FeatureCard icon={<FaChartLine size={28} color="#dfa30a" />} text="Track Your Progress" />
          <FeatureCard icon={<GiBrain size={28} color="#dfa30a" />} text="Spaced Repetition" />
          <FeatureCard icon={<FaRegCalendarAlt size={28} color="#dfa30a"/>} text="Smart Calendar" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h1>How It Works</h1>
        <div className="steps-grid">
          <Step title="Sign Up" desc="Create your free account" />
          <Step title="Add Tasks" desc="Assign topics with difficulty" />
          <Step title="Get Reminded" desc="Stay on track with notifications" />
        </div>
      </section>

      <section className="spaced-repetition-info">
        <h2>What is Spaced Repetition?</h2>
        <p>
          Spaced Repetition is a scientifically proven learning method that
          improves memory retention by reviewing topics at increasing intervals.
          It strengthens long-term understanding by focusing on topics just
          before you're likely to forget them—helping you study smarter, reduce
          cramming, and achieve better results with consistent and efficient
          review sessions.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Smart Study Planner - SPACELY</p>
      </footer>
    </div>
  );
}
