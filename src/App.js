// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import ShowDetails from './components/ShowDetails';
// import BookSeats from './components/BookSeats';
// import Receipt from './components/Receipt';
// import './index.css';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/show/:id" element={<ShowDetails />} />
//         <Route path="/book/:id" element={<BookSeats />} />
//         <Route path="/receipt/:id" element={<Receipt />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import ShowDetails from './components/ShowDetails';
// import BookSeats from './components/BookSeats';
// import Receipt from './components/Receipt';
// import './index.css';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/show/:id" element={<ShowDetails />} />
//         <Route path="/book/:id" element={<BookSeats />} />
//         <Route path="/receipt/:id" element={<Receipt />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookSeats from './components/BookSeats';
import Receipt from './components/Receipt';
import ShowDetails from './components/ShowDetails';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/book/:id" element={<BookSeats />} />
        <Route path="/receipt/:id" element={<Receipt />} />
      </Routes>
    </Router>
  );
};

export default App;
