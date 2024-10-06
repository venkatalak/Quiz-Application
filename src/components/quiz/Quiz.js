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

  const levels = [
    { range: [0, 3], label: 'Beginner' },
    { range: [4, 6], label: 'Intermediate' },
    { range: [7, 9], label: 'Professional' }
  ];

  const levelColors = {
    Beginner: {
      bgColor: "#deda6f",
      activeColor: "#787409"
    },
    Intermediate: {
      bgColor: "#6fa3de",
      activeColor: "#094a78"
    },
    Professional: {
      bgColor: "#b5d45c",
      activeColor: "#5b780c"
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log('Fetching questions for topic:', topic);
        const response = await axios.get(`http://localhost/quiz-application-backend/fetch-questions.php?topic=${topic}`);
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [topic]);

  const getLevel = () => {
    const level = levels.find(l => currentQuestion >= l.range[0] && currentQuestion <= l.range[1]);
    return level ? level.label : '';
  };

  const handleAnswer = (index) => {
    console.log(questions[currentQuestion].correct_answer,index);
    if (questions[currentQuestion].correct_answer === index) {
      setScore(score + 1);
    }
   console.log(score);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setHoveredOption(null);
    } else {
      postScore();
      setIsFinished(true);
    }
  };

  const postScore = async () => {
    try {
      await axios.post('http://localhost/quiz-application-backend/score.php', {
        score,
        topic
      });
      console.log('Score posted successfully:', score);
    } catch (error) {
      console.error('Error saving score:', error);
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
