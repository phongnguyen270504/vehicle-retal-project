const multer = require('multer');
const path= require('path');

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../public/uploads/cars'));
        },
        filename: function (req, file, cb) {
             const uniqueName =
            Date.now() + path.extname(file.originalname);
            cb(null, uniqueName);
        }
    }
)

const fileFilter= (req, file, cb)=>{
    const allowedTypes= ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
}

const upload= multer(
    {
        storage,
        fileFilter,
    }
)

module.exports= upload.single('image');