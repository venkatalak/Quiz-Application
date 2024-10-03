import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Topics.css'; // Import the CSS file

function Topics() {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mocking API call for topics (replace with axios.get('/api/topics'))
    const mockTopics = ['Sports', 'Science & Technology', 'Arts', 'Politics'];
    setTopics(mockTopics);
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


