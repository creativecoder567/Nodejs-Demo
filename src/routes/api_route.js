var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var api = require('../controller/api_controller');

router.get('/service_city', api.fetchServiceCity);
router.post('/add_service_city', api.addServiceCity);
router.get('/banner_with_service', api.fetchBannerServiceData);
router.get('/service/:cat_id', api.services);
router.get('/service_detail/:place_id', api.serviceDetail);

router.post("/create_banner", api.createBanner);


// get sticker_group
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, (Math.random().toString(36) + '00000000000000000').slice(2, 10) + Date.now() + path.extname(file.originalname));

    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var fileType = ['png', 'jpg', 'webp'];
        if (fileType.indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    },
    limits: {
        fieldNameSize: 100,
        files: 20,
        fields: 102,
        fileSize: 10 * 10 * 1024 * 1024,
        fieldSize: 205 * 1024 * 1024
    }
}).array('image', 10);

var stickerGroupUploader = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var fileType = ['png', 'jpg', 'webp'];
        if (fileType.indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    },
    limits: {
        fieldNameSize: 100,
        files: 1,
        fields: 12,
        fileSize: 2 * 1024 * 1024
    }
}).single('image');

router.post("/create_service", upload, api.createService);
router.post("/create_service_category", stickerGroupUploader, api.createServiceCategory);

router.post("/add_contact_message", api.addContactMessage);


module.exports = router;
