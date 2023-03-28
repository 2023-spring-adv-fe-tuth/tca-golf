import { HashRouter, Routes, Route } from "react-router-dom";

import { HomePage, PlayPage, ResultsPage } from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { useEffect } from "react";



const App = () => {
  
  

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>

      </HashRouter>
    </div>
  );
}

export default App;
