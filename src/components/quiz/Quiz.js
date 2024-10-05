import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css'; // Ensure this path is correct

function Quiz() {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null); // Track hovered option
  const navigate = useNavigate();

  // Define question levels
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
    // Mocking questions (replace with axios.get(`/api/questions?topic=${topic}`))
    const mockQuestions = [
      { question: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Madrid', 'Rome'], correctAnswer: 0 ,level: "Beginner"},
      { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: 1,level: "Beginner"},
      { question: 'What is the largest ocean?', options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correctAnswer: 1,level: "Beginner" },
      { question: 'Who wrote "Hamlet"?', options: ['Shakespeare', 'Tolkien', 'Rowling', 'Homer'], correctAnswer: 0,level: "Beginner" },
      { question: 'What planet is closest to the sun?', options: ['Mercury', 'Venus', 'Earth', 'Mars'], correctAnswer: 0 ,level: "Intermediate"},
      { question: 'What is the boiling point of water?', options: ['90°C', '100°C', '110°C', '120°C'], correctAnswer: 1 ,level: "Intermediate"},
      { question: 'What year did WW2 end?', options: ['1942', '1945', '1948', '1950'], correctAnswer: 1 ,level: "Intermediate"},
      { question: 'What is the square root of 81?', options: ['8', '9', '10', '11'], correctAnswer: 1,level: "Professional" },
      { question: 'Which country hosted the 2020 Olympics?', options: ['China', 'Japan', 'USA', 'Brazil'], correctAnswer: 1 ,level: "Professional"},
      { question: 'Who painted the Mona Lisa?', options: ['Da Vinci', 'Van Gogh', 'Picasso', 'Rembrandt'], correctAnswer: 0,level: "Professional" }
    ];
    
    setQuestions(mockQuestions);
  }, [topic]);

  const getLevel = () => {
    // Determine the level based on the current question index
    const level = levels.find(l => currentQuestion >= l.range[0] && currentQuestion <= l.range[1]);
    return level ? level.label : '';
  };

  const handleAnswer = (index) => {
    if (questions[currentQuestion].correctAnswer === index) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setHoveredOption(null); // Reset hovered option for next question
    } else {
      setIsFinished(true);
    }
  };

  // Redirect to result page when finished
  useEffect(() => {
    if (isFinished) {
      navigate(`/result/${score}`);
    }
  }, [isFinished, navigate, score]);

  return (
    <div className='quiz-page-bg'>
      <div className="quiz-container">
        {questions.length > 0 ? (
          <>
            <h2>Topic: {topic}</h2>
            <h4>Level: {getLevel()}</h4>
            <h3>Question {currentQuestion + 1} of {questions.length}</h3>
            <p>{questions[currentQuestion].question}</p>
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => {
                const currentLevel = questions[currentQuestion].level;
                const isHovered = hoveredOption === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    onMouseEnter={() => setHoveredOption(index)} // Set hovered option on hover
                    onMouseLeave={() => setHoveredOption(null)}  // Remove hover when leaving
                    className="option-button"
                    style={{
                      backgroundColor: isHovered
                        ? levelColors[currentLevel].activeColor
                        : levelColors[currentLevel].bgColor
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p>Loading questions...</p> // Handle loading state
        )}
      </div>
    </div>
  );
}

export default Quiz;
