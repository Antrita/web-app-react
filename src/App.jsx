// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import NotesSection from './components/NotesSection';
import TodoSection from './components/ToDoSection';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotesSection />} />
          <Route path="/todos" element={<TodoSection />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;