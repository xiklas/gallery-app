const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.onImageUpload = functions
  .region('europe-west3')
  .storage
  .object()
  .onFinalize(async (object) => {
    // Überprüfe, ob die Datei ein Bild ist
    if (!object.contentType.startsWith('image/')) {
      console.log('Kein Bild hochgeladen.');
      return null;
    }

    const bucket = admin.storage().bucket();
    const imageListFile = bucket.file('imageList.json');

    let imageList = [];
    try {
      // Lade aktuelle Liste der Bilder
      const [fileExists] = await imageListFile.exists();
      if (fileExists) {
        const [contents] = await imageListFile.download();
        imageList = JSON.parse(contents.toString());
      } else {
        console.log('Keine vorherige imageList gefunden. Erstelle eine neue.');
      }
    } catch (error) {
      console.error('Fehler beim Laden der imageList.json:', error);
    }

    // Bild-URL erstellen
    const filePath = object.name;
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`;

    // Füge die neue Bild-URL hinzu
    imageList.push(imageUrl);

    // Speichere die aktualisierte Liste
    await imageListFile.save(JSON.stringify(imageList, null, 2));
    console.log('imageList.json erfolgreich aktualisiert.');

    return null;
  });
