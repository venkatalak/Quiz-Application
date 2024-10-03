import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Quiz.css';

function Quiz() {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost/quiz-application-backend/fetch-questions.php?topic=${topic}`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [topic]);

  const handleAnswer = (index) => {
    if (questions[currentQuestion].correct_answer === index) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setHoveredOption(null);
    } else {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    if (isFinished) {
      const postScore = async () => {
        try {
          await axios.post('http://localhost/quiz-application-backend/score.php', {
            score: score,
            topic: topic
          });
          navigate(`/result/${topic}`); 
          console.log(score);
        } catch (error) {
          console.error('Error posting score:', error);
        }
      };

      postScore();
    }
  }, [isFinished, score, topic, navigate]);

  return (
    <div className='quiz-page-bg'>
      <div className="quiz-container">
        {questions.length > 0 ? (
          <>
            <h2>Topic: {topic}</h2>
            <h3>Question {currentQuestion + 1} of {questions.length}</h3>
            <p>{questions[currentQuestion].question}</p>
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className="option-button"
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
}

export default Quiz;
