// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/" element={<NewsList />} />
      </Routes>
    </Router>
  );
};

export default App;
