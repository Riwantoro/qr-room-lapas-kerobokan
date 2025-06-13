import "./../index.css";
import wbpData from "../data/wbp.json";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QRRoomList() {
  const [rooms, setRooms] = useState({});
  const navigate = useNavigate();

  // Get base URL dynamically
  const getBaseUrl = () => {
    return window.location.origin;
  };

  useEffect(() => {
    const data = Object.values(wbpData)[0]?.slice(1) || [];
    const grouped = {};

    data.forEach((inmate) => {
      const room = inmate.wisma || "Lainnya";
      if (!grouped[room]) grouped[room] = [];
      grouped[room].push(inmate);
    });

    setRooms(grouped);
  }, []);

  const handleRoomClick = (room) => {
    navigate(`/room/${encodeURIComponent(room)}`);
  };

  // Debug function
  const generateQRUrl = (room) => {
    const url = `${getBaseUrl()}/room/${encodeURIComponent(room)}`;
    console.log(`QR URL for ${room}:`, url);
    return url;
  };

  return (
    <div>
      <h1>QR Code by Room</h1>
      <div className="qr-section">
        {Object.keys(rooms).map((room) => (
          <div 
            className="qr-card clickable" 
            key={room}
            onClick={() => handleRoomClick(room)}
            style={{ cursor: 'pointer' }}
            title={`Click to view ${room} data`}
          >
            <QRCode value={generateQRUrl(room)} size={128} />
            <h3>{room}</h3>
            <p className="click-hint">Click or scan to view</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRRoomList;