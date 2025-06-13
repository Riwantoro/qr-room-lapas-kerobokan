import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import wbpData from "../data/wbp.json";

function RoomDetail() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Decode the room ID from URL
      const decodedRoomId = decodeURIComponent(roomId);
      
      // Get data from JSON
      const data = Object.values(wbpData)[0]?.slice(1) || [];
      
      // Filter by room/wisma
      const filteredData = data.filter((inmate) => {
        const room = inmate.wisma || "Lainnya";
        return room === decodedRoomId;
      });
      
      setRoomData(filteredData);
      setLoading(false);
      
      console.log("Room ID:", decodedRoomId);
      console.log("Filtered data:", filteredData);
      
    } catch (error) {
      console.error("Error loading room data:", error);
      setLoading(false);
    }
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>;
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
      <h2>Total WBP: {roomData.length}</h2>
      
      <div className="inmates-list">
        {roomData.map((inmate, index) => (
          <div key={index} className="inmate-card">
            <h3>{inmate.nama}</h3>
          </div>
        ))}
      </div>
      
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}

export default RoomDetail;