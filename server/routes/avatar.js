const path = require('path');
const Multer = require('multer');

const { User } = require('../db/models');

router.post('/', async (req, res) => {
  if (!res.locals.user) {
    res.redirect('/auth');
    return;
  }

  const storage = Multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('uploads/'));
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
      // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      const dotIndex = file.originalname.lastIndexOf('.');
      const filename = file.originalname.slice(0, dotIndex) + '_' + Date.now() + file.originalname.slice(dotIndex);
      cb(null, filename);
    }
  });
  
  const fileFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };

  let upload = Multer({ storage, fileFilter }).single('image');

  upload(req, res, async (err) => {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select an image to upload');
    }
    else if (err instanceof Multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    try {

    } catch (error) {
      res.end(error.message);
      return;
    }

    res.send(`You have uploaded this image! ${req.file.filename}`);
  });
});
