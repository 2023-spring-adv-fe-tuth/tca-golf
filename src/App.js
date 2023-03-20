import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { NavBar } from './NavBar';
import { HomePage, PlayPage, ResultsPage } from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={< HomePage/>} />
          <Route path="/Play" element={< PlayPage />} />
          <Route path="/Results" element={< ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
