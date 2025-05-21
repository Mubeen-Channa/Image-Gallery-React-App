import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ApiKey = 'PSFlvC4CD7o3EBqhkkZ49Bb709zTMwp-ZPDQuIh3AkM';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);


  const loadImages = async () => {
    const URL = query
      ? `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${query}&client_id=${ApiKey}`
      : `https://api.unsplash.com/photos?page=${page}&per_page=12&client_id=${ApiKey}`;

    const res = await axios.get(URL);

    const newImages = query ? res.data.results : res.data;

    setImages(prev => page === 1 ? newImages : [...prev, ...newImages]);
  };


  useEffect(() => {
    loadImages();
  }, [page]);


  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadImages();
  };

  
  return (
    <div className="container py-4">
      <h2 className="text-center text-black mb-4">📸 Image Gallery</h2>
    </div>
  );
};

export default App;