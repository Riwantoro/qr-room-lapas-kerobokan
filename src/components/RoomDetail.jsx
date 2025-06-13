// RoomDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RoomDetail() {
  const { roomId } = useParams();
  const [inmates, setInmates] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/room/${roomId}`);
        const data = await res.json();
        setInmates(data);
        if (data.length > 0) {
          setRoomName(data[0].wisma || roomId);
        } else {
          setRoomName(roomId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [roomId]);

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>Room: {roomName}</h2>
      <ul>
        {inmates.length > 0 ? (
          inmates.map((inmate, idx) => (
            <li key={idx}>{inmate.name}</li>
          ))
        ) : (
          <p>No inmates found in this room.</p>
        )}
      </ul>
    </div>
  );
}

export default RoomDetail;
