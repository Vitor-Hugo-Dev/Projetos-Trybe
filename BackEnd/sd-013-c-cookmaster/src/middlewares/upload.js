const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, './src/uploads/'); },
  filename: (req, file, cb) => { 
    const { id } = req.params;
    cb(null, `${id}.jpeg`); 
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};