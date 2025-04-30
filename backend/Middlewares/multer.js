// utils/cloudinaryStorage.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});

const parser = multer({ storage });

module.exports = parser;
