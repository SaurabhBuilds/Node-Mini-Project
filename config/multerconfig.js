const multer = require('multer');
const path = require('path');
const crypto = require('crypto')

//diskstorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {   //this part sets file's folder
      cb(null, 'public/images/uploads')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12, function (err, name){    // this part sets file's name 
        const fn = name.toString("hex")+path.extname(file.originalname)//the name will be converted into buffer, so we convert it in string and we will add extention of the original file 
        cb(null, fn)
      })
    }
  })

 //export upload variable
const upload = multer({ storage: storage })

module.exports = upload;

