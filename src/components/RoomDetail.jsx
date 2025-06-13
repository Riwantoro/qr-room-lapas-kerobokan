import "../index.css";
import { useParams } from "react-router-dom";
import wbpData from "../data/wbp.json";
import { useEffect, useState } from "react";

function RoomDetail() {
  const { roomId } = useParams();
  const [inmates, setInmates] = useState([]);

  useEffect(() => {
    const data = Object.values(wbpData)[0]?.slice(1) || [];
    const filtered = data.filter(
      (inmate) => inmate.wisma?.toLowerCase() === roomId.toLowerCase()
    );
    setInmates(filtered);
  }, [roomId]);

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <ul>
        {inmates.map((inmate, idx) => (
          <li key={idx}>{inmate.nama}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoomDetail;
