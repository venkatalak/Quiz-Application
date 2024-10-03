import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Topics from './components/topics/Topics';
import Quiz from './components/quiz/Quiz';
import Result from './components/result/Result';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="849417418109-etba2pprgegavrmjj3d5dlg3damtp589.apps.googleusercontent.com">
    <Router>
      <Routes>
        <Route path="/"  index element={<Login />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/quiz/:topic" element={<Quiz />} />
        <Route path="/result/:score" element={<Result />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
