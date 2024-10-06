import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Result.css'; // Ensure you have this CSS file

function Result() {
  const { score } = useParams();
  const [latestScore, setLatestScore] = useState(null);
  const navigate = useNavigate(); // To navigate to another page

  useEffect(() => {
    const fetchLatestScore = async () => {
      try {
        const response = await axios.get(`http://localhost/quiz-application-backend/result.php?topic=${score}`);
        setLatestScore(response.data.score);
      } catch (error) {
        console.error('Error fetching latest score:', error);
      }
    };

    fetchLatestScore();
  }, [score]);

  return (
    <div className="result-container">
      <h1>Your Score: {latestScore !== null ? latestScore : 'Loading...'}</h1>
      <button className="try-again-button" onClick={() => navigate('/topics')}>
        Try Again
      </button>
    </div>
  );
}

export default Result;
