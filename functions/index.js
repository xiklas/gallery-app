const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Importiere die Funktionen aus separaten Dateien
const { onImageUpload } = require('./imageUpload');
const { getImageList } = require('./getList');

// Exportiere die Funktionen
exports.onImageUpload = onImageUpload;
exports.getImageList = getImageList;
