import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Home from './components/home';
import './App.css';

function App() {
  const handleSignIn = async (credentials) => {
    // Ici, intégrez avec l'API de votre backend pour la connexion
    console.log('Sign In', credentials);
  };

  const handleSignUp = async (credentials) => {
    // Ici, intégrez avec l'API de votre backend pour l'inscription
    console.log('Sign Up', credentials);
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/home">Home</Link>
          <Link to="/signin">Connexion</Link>
          <Link to="/signup">Inscription</Link>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
