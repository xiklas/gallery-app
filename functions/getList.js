const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.getImageList = functions
  .region('europe-west3')
  .https
  .onRequest(async (req, res) => {
    // CORS Header setzen
    res.set('Access-Control-Allow-Origin', '*'); // Erlaube alle Ursprünge
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      // Handle preflight requests
      res.status(204).send('');
      return;
    }

    const bucket = admin.storage().bucket();
    const file = bucket.file('imageList.json');

    try {
      const [exists] = await file.exists();
      if (!exists) {
        res.status(404).send('imageList.json nicht gefunden.');
        return;
      }

      const [contents] = await file.download();
      const imageList = JSON.parse(contents.toString());

      res.status(200).json(imageList);
    } catch (error) {
      console.error('Fehler beim Abrufen der imageList.json:', error);
      res.status(500).send('Fehler beim Abrufen der Bilder.');
    }
  });
