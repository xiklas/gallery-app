// src/components/Gallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  './Gallery.css';

const Gallery = () => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL der getImageList-Funktion
    const functionUrl = 'https://europe-west3-theprojectindex-8b645.cloudfunctions.net/getImageList';

    const fetchImageList = async () => {
      try {
        const response = await axios.get(functionUrl);
        setImageList(response.data);
      } catch (error) {
        setError('Fehler beim Abrufen der Bilder.');
        console.error('Fehler:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="gallery">
      {imageList.length === 0 ? (
        <p>Keine Bilder vorhanden.</p>
      ) : (
        imageList.map((url, index) => (
          <div key={index} className="gallery-item">
            <img src={url} alt={`Bild ${index}`} />
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;
