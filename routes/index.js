const express = require('express');
const multer = require('multer');
const Picture = require('../models/picture');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  Picture.find((err, pictures) => {
    res.render('index', {pictures})
  })
});


// Route to upload from project base path
const upload = multer({ dest: './public/uploads/' });

// `upload.single('photo')` is a middleware that:
// - takes the ouput of `<input type="file" name="photo">`  
// - saves the file in `./public/uploads/`
// - defines a `req.file` with some properties: `filename`, `originalname`
router.post('/upload', upload.single('photo'), (req,res,next) => {
  Picture.create({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  })
    .then(() => {
      res.redirect('/');
    })
});


module.exports = router;
