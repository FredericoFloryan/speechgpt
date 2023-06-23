import React from 'react';
import { useNavigate } from 'react-router-dom';
const Landing = () => {
  const navigate = useNavigate();
  const nextPage = () => {
    navigate("/Authentication")
  }
  return (
    <div>
      <h1>Landing</h1>
      <button onClick={() => nextPage()}>Sign in</button>
    </div>
  );
};

export default Landing;
