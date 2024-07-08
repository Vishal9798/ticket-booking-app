




import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../index.css';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      const showDoc = doc(db, 'shows', id);
      const showData = await getDoc(showDoc);
      if (showData.exists()) {
        setShow(showData.data());
      }
    };

    fetchShow();
  }, [id]);

  if (!show) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="show-details">
        <div className="show-image">
          <img src={show.posterURL} alt={show.title} className="show-banner-detail" />
        </div>
        <div className="show-description">
          <h1 className="title">{show.title}</h1>
          <p className="description">{show.description}</p>
          <Link to={`/book/${id}`} className="button">Book Seats</Link>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
