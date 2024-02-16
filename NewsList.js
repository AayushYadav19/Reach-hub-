import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'cn7fk7pr01qgjtj4j5mgcn7fk7pr01qgjtj4j5n0';
        const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
        const response = await axios.get(
          `https://finnhub.io/api/v1/news?category=general&token=${apiKey}&from=${thirtyDaysAgo}`
        );
        setNews(response.data);
        setFilteredNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = news.filter((item) =>
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(filtered);
  };

  return (
    <div>
      <h2>Company News</h2>
      <SearchBar onSearch={handleSearch} />
      <ul>
      {filteredNews.map((item) => (
  <li key={item.url}>
    <Link to={`/news/${encodeURIComponent(item.url)}`}>{item.headline}</Link>

  </li>
))}

      </ul>
    </div>
  );
};

export default NewsList;
