import React, { useState } from 'react';
import RoomOccupants from './components/RoomOccupants';

function App() {
  const [room, setRoom] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setRoom(data);
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="App">
      <header>
        <h1>Sistem Manajemen Kamar Lapas Kerobokan</h1>
      </header>
      
      <main>
        {!room ? (
          <div className="scanner-container">
            {scanning ? (
              <>
                <qr-scanner 
                  on-result={handleScan}
                  on-error={handleError}
                ></qr-scanner>
                <button onClick={() => setScanning(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setScanning(true)}>Scan QR Kamar</button>
            )}
          </div>
        ) : (
          <RoomOccupants room={room} onBack={() => setRoom(null)} />
        )}
      </main>
    </div>
  );
}

export default App;