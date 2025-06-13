// QRRoomList.jsx
import React from "react";
import QRCode from "react-qr-code";
import "./QRRoomList.css";

const rooms = [
  "WISMA YUDISTIRA - A7",
  "WISMA BIMA - C21",
  "KLINIK - ISOLASI1",
  "WISMA YUDISTIRA - A6",
  // Add more rooms as needed
];

const baseURL = "https://qrroom-lapaskerobokan.netlify.app";

function QRRoomList() {
  return (
    <div className="container">
      <h1>QR Code by Room</h1>
      <div className="grid">
        {rooms.map((room, index) => {
          const roomId = room.replace(/\s+/g, "").toUpperCase();
          const qrValue = `${baseURL}/room/${roomId}`;
          return (
            <div key={index} className="qr-box">
              <a href={qrValue} target="_blank" rel="noopener noreferrer">
                <QRCode value={qrValue} size={128} />
              </a>
              <p>{room}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QRRoomList;
