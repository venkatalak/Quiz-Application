import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Topics.css'; // Import the CSS file

function Topics() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      const response = await axios.get('http://localhost/quiz-application-backend/fetch-topics.php'); // Adjust the URL to your backend
      setTopics(response.data.map(topic => topic.name)); // Assuming your backend returns an array of objects with a 'name' property
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  useEffect(() => {
    
    fetchTopics();
  }, []);

  return (
    <div className="topics-container">
      <h1>Choose your Topic</h1>
      <ul className="topics-list">
        {topics.map((topic, index) => (
          <li key={index} onClick={() => navigate(`/quiz/${topic}`)}>
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Topics;
