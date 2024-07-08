
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../index.css';

const Receipt = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [seatNumber, setSeatNumber] = useState(null); // State to hold seat number

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const showDoc = doc(db, 'shows', id);
        const showData = await getDoc(showDoc);
        if (showData.exists()) {
          setShow(showData.data());
        }
      } catch (error) {
        console.error('Error fetching show:', error);
      }
    };

    fetchShow();
  }, [id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const seat = searchParams.get('seat');
    setSeatNumber(seat); // Set the seat number from URL query params
  }, []);

  if (!show) return <div className="loading">Loading...</div>;

  return (
    <div className="container receipt">
      <h1 className="title">Booking Successful</h1>
      <div className="receipt-info">
        <p className="receipt-details"><strong>Booking ID:</strong> {id}</p>
        <p className="receipt-details"><strong>Seat Number:</strong> {seatNumber}</p>
        <p className="receipt-details"><strong>Movie Name:</strong> {show.title}</p>
        <p className="receipt-details">Thank you for your purchase! Your seat is reserved and we look forward to seeing you at the event. Take Screenshot for your future Reference.</p>
      </div>
    </div>
  );
};

export default Receipt;
