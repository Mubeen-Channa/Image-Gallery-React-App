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

      <form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
        <input
          className="form-control w-50 me-2"
          type="text"
          placeholder="Search images..."
          value={ query }
          onChange={( e ) => setQuery(e.target.value)}
        />
        <button className="btn btn-light">Search</button>
      </form>

      <div className="row g-3">
        {images.map(( img ) => (
          <div className="col-6 col-md-4 col-lg-3" key={ img.id }>
            <div className="card image-card shadow-sm">
              <img src={ img.urls.small } className="card-img-top gallery-img" alt="img" />
              <div className="card-body p-2">
                <small className="text-muted text-center d-block">{ img.user.name }</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => setPage( page + 1 )}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default App;