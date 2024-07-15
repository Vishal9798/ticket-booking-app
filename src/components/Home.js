

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const showsCollection = collection(db, 'shows');
      const showSnapshot = await getDocs(showsCollection);
      const showList = showSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShows(showList);
    };

    fetchShows();
  }, []);

  return (
    <div className="container">
      <h1 className="header">BookEase</h1>
      <ul className="show-list">
        {shows.map(show => (
          <li key={show.id} className="show-item">
            <Link to={`/show/${show.id}`} className="show-link">
              <img src={show.posterURL} alt={show.title} className="show-banner" />
              <h2 className="show-title">{show.title}</h2>
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
