const multer = require('multer')

export class FileUpload {

    constructor() {
    }

    upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads");
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + "_" + Date.now() + ".jpg");
            }
        })
    }).single("image")
}


export default new FileUpload();