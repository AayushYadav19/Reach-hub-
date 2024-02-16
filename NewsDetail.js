import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { urlId } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const apiKey = 'cn7fk7pr01qgjtj4j5mgcn7fk7pr01qgjtj4j5n0';
        const response = await axios.get(
          `https://finnhub.io/api/v1/news/${urlId}?token=${apiKey}`
        );

        // Check if the response status is not 200
        if (response.status !== 200) {
          throw new Error(`Invalid API response. Status: ${response.status}`);
        }

        // Check if the response data has the expected attributes
        const { data } = response;
        if (data && data.length > 0) {
          setNewsDetail(data[0]); // Assuming the API returns an array of news items
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error('Error fetching news detail:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [urlId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching news detail: {error.message}</div>;
  }

  if (!newsDetail) {
    return <div>Invalid or missing data in API response</div>;
  }

  return (
    <div>
      <h2>{newsDetail.headline}</h2>
      {newsDetail.image && <img src={newsDetail.image} alt="Thumbnail" />}
      <p>Source: {newsDetail.source || 'N/A'}</p>
      <p>Published Time: {newsDetail.datetime ? new Date(newsDetail.datetime * 1000).toLocaleString() : 'N/A'}</p>
      <p>Related: {newsDetail.related || 'N/A'}</p>
      <p>Summary: {newsDetail.summary || 'N/A'}</p>
      <p>URL: <a href={newsDetail.url} target="_blank" rel="noopener noreferrer">{newsDetail.url}</a></p>
      {/* Add more details as needed */}
    </div>
  );
};

export default NewsDetail;
