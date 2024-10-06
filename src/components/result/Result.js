import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Result() {
  const { score } = useParams();
  const [latestScore, setLatestScore] = useState(null);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    setTopic(score); 
  }, [score]);

  useEffect(() => {
    const fetchLatestScore = async () => {
      if (topic) { 
        try {
          const response = await axios.get(`http://localhost/quiz-application-backend/result.php?topic=${topic}`);
          console.log(response);
          setLatestScore(response.data.score); 
          
        } catch (error) {
          console.error('Error fetching latest score:', error);
        }
      }
    };

    fetchLatestScore(); 
  }, [topic]);

  return (
    <div>
      <h1>Your Score: {score}</h1>
      {latestScore && <h2>Latest Score for {topic}: {latestScore}</h2>}
    </div>
  );
}

export default Result;
