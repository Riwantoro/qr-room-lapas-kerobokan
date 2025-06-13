// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRRoomList from "./components/QRRoomList";
import RoomDetail from "./components/RoomDetail";
import "./index.css";
import QRCode from "react-qr-code";

function RoomQRCode({ room }) {
  const roomUrl = `https://qrroom-lapaskerobokan.netlify.app/room/${room.replace(/\s+/g, "").toUpperCase()}`;
  return (
    <div className="qr-box">
      <QRCode value={roomUrl} size={128} />
      <p>{room}</p>
    </div>
     );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<QRRoomList />} />
          <Route path="/room/:roomId" element={<RoomDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
