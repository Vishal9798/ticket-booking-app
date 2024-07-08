
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const BookSeats = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedSeatInfo, setSelectedSeatInfo] = useState(null);
  const paypalContainerRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSeatSelection = (seat) => {
    if (show.bookedSeats.includes(seat)) {
      setSelectedSeat(null);
      setSelectedSeatInfo(`Seat ${seat} is already booked.`);
    } else if (selectedSeat === null) {
      setSelectedSeat(seat);
      setSelectedSeatInfo(`You have selected seat ${seat}. Only one seat can be booked at a time due to high demand. Proceed to Payment. (Note-: Refresh the page to select different seat)`);
    }
  };

  const loadPayPalScript = async () => {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AauS6iHYnouJHKuEeiio0BFUwq7rWJNUTt9do2TFP4HATkyk8M5hBZ-iqqUYiyQwo-xzYrQdlPuqJaiE';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const initializePayPalButtons = async () => {
      try {
        await loadPayPalScript();
        if (paypalContainerRef.current && paypalContainerRef.current.innerHTML === '') {
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '5.00' // Example amount
                  }
                }]
              });
            },
            onApprove: async (data, actions) => {
              const details = await actions.order.capture();
              alert('Transaction completed by ' + details.payer.name.given_name);
              const showDoc = doc(db, 'shows', id);
              await updateDoc(showDoc, {
                bookedSeats: arrayUnion(selectedSeat),
              });
              navigate(`/receipt/${id}?seat=${selectedSeat}`); // Navigate with seat number
            },
            onError: (err) => {
              console.error('Error during PayPal transaction:', err);
            }
          }).render('.buttons'); // Render PayPal buttons to '.buttons' div
        }
      } catch (error) {
        console.error('Error initializing PayPal buttons:', error);
      }
    };

    initializePayPalButtons();
  }, [navigate, id, selectedSeat]);

  if (!show) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1 className="title">Book Seats for {show.title}</h1>
      <div className="info">
        <p>{selectedSeatInfo}</p>
        <div className="seats">
          {show.seats &&
            show.seats.map((seat) => (
              <button
                key={seat}
                onClick={() => handleSeatSelection(seat)}
                className={`seat ${selectedSeat === seat ? 'selected' : ''} ${show.bookedSeats.includes(seat) ? 'booked' : ''}`}
                disabled={show.bookedSeats.includes(seat) || (selectedSeat !== null && selectedSeat !== seat)}
              >
                {seat}
              </button>
            ))}
        </div>
      </div>
      <div className="paypal-button-container">
        <div className="buttons" ref={paypalContainerRef}></div> {/* Ensure this div is correctly styled */}
      </div>
    </div>
  );
};

export default BookSeats;
