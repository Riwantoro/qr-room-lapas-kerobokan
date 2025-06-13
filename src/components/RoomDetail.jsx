import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RoomDetail() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Railway backend URL - GANTI INI DENGAN URL RAILWAY KAMU
  const API_BASE_URL = 'https://qr-room-lapas-kerobokan-backend-production.up.railway.app';

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Decode the room ID from URL
        const decodedRoomId = decodeURIComponent(roomId);
        
        const response = await fetch(`${API_BASE_URL}/api/occupants/${encodeURIComponent(decodedRoomId)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
          setRoomData(data.occupants || []);
        } else {
          throw new Error(data.error || 'Failed to fetch room data');
        }
        
        console.log("Room ID:", decodedRoomId);
        console.log("API Response:", data);
        
      } catch (err) {
        console.error("Error loading room data:", err);
        setError(err.message);
        setRoomData([]);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  if (loading) {
    return (
      <div>
        <h2>Room: {decodeURIComponent(roomId)}</h2>
        <p>Loading room data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Room: {decodeURIComponent(roomId)}</h2>
        <div className="error-message">
          <p>Error loading room data: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  if (roomData.length === 0) {
    return (
      <div>
        <h2>Room: {decodeURIComponent(roomId)}</h2>
        <p>No data found for this room.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Room: {decodeURIComponent(roomId)}</h2>
      <h3>Total WBP: {roomData.length}</h3>
      
      <div className="inmates-list">
        {roomData.map((inmate, index) => (
          <div key={index} className="inmate-card">
            <h3>{inmate.nama}</h3>
            <p><strong>No. Registrasi:</strong> {inmate.no_registrasi}</p>
            <p><strong>Pidana:</strong> {inmate.pidana}</p>
            <p><strong>Tanggal Masuk:</strong> {inmate.tanggal_masuk}</p>
            <p><strong>Tanggal Ekspirasi:</strong> {inmate.tanggal_ekspirasi}</p>
            {inmate.wisma && <p><strong>Wisma:</strong> {inmate.wisma}</p>}
          </div>
        ))}
      </div>
      
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}

export default RoomDetail;