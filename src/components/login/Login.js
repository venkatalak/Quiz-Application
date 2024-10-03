import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Google Token:', response.credential);
    navigate('/topics');
  };

  const handleLoginFailure = () => {
    console.error('Login failed');
  };

  return (
    <div className="login-page-bg">
      <div className="login-box">
        <h1>Login to Start the Quiz</h1>
        <GoogleLogin
          className="google-login-button"
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </div>
  );
}

export default Login;
