const multer = require('multer')
const upload = multer({dest : 'uploads/',
                       limits: { fileSize: 5*1024*1024},
                       fileFilter:(req,file,cb)=>{
                        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp'){
                          cb(null, true);
                        } else {
                          cb( new Error('Invalid file type'), false);
                        }
                      }
})

module.exports = upload