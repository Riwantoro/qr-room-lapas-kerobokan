import "./../index.css";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QRRoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Railway backend URL - GANTI INI DENGAN URL RAILWAY KAMU
  const API_BASE_URL = 'https://qr-room-lapas-kerobokan-backend-production.up.railway.app/';

  // Get base URL dynamically
  const getBaseUrl = () => {
    return window.location.origin;
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/api/rooms`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setRooms(data.rooms || []);
        } else {
          throw new Error(data.error || 'Failed to fetch rooms');
        }
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError(err.message);
        // Fallback to empty array if API fails
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
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

  if (loading) {
    return (
      <div>
        <h1>QR Code by Room</h1>
        <p>Loading rooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>QR Code by Room</h1>
        <div className="error-message">
          <p>Error loading rooms: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div>
        <h1>QR Code by Room</h1>
        <p>No rooms available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>QR Code by Room</h1>
      <p>Total Rooms: {rooms.length}</p>
      <div className="qr-section">
        {rooms.map((room) => (
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