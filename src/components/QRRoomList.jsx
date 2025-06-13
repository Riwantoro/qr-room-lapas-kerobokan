import "./../index.css";
import wbpData from "../data/wbp.json";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

function QRRoomList() {
  const [rooms, setRooms] = useState({});

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

  return (
    <div>
      <h1>QR Code by Room</h1>
      <div className="qr-section">
        {Object.keys(rooms).map((room) => (
          <div className="qr-card" key={room}>
            <QRCode value={`http://localhost:5173/room/${encodeURIComponent(room)}`} size={128} />
            <h3>{room}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRRoomList;
