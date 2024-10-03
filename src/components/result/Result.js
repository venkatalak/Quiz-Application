import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Result.css'; // Ensure you have this CSS file

function Result() {
  const { score } = useParams();
  const navigate = useNavigate();

  return (
    <div className="result-container">
      <h1 className="score-heading">Your Score: {score}</h1>
      <button className="try-again-button" onClick={() => navigate('/topics')}>
        Try Again
      </button>
    </div>
  );
}

export default Result;
