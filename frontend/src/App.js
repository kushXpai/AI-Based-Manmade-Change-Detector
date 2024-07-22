import React, { useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [changeMask, setChangeMask] = useState(null);

  const handleFileChange = (e, setImage) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDetectChanges = async () => {
    const response = await axios.post('http://localhost:5000/detect_changes', {
      image1: image1.split(',')[1],
      image2: image2.split(',')[1],
    });
    setChangeMask(response.data.change_mask);
  };

  return (
    <div>
      <h1>Change Detection</h1>
      <input type="file" onChange={(e) => handleFileChange(e, setImage1)} />
      <input type="file" onChange={(e) => handleFileChange(e, setImage2)} />
      <button onClick={handleDetectChanges}>Detect Changes</button>
      {changeMask && <img src={`data:image/png;base64,${changeMask}`} alt="Change Mask" />}
      <div id="map" style={{ height: '500px' }}></div>
    </div>
  );
};

export default App;
