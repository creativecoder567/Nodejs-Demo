const db = require('../model/index');
var apiService = require('../service/api_service');
const env = process.env.NODE_ENV || 'development';
const envConfig = require('../.././config/config.json')[env].DB;
var path = require('path');
var fs = require('fs');

exports.fetchBannerServiceData = async (req, res, next) => {
    try {
        let result = await db.sequelize.query(`select * from banner`, {type: db.sequelize.QueryTypes.SELECT})
        let result2 = await db.sequelize.query(`select * from service_category`, {type: db.sequelize.QueryTypes.SELECT})
        return res.json(
            {banner: result, service_category: result2}
        );
    } catch (e) {
        console.log(e);
        throw e;
    }

}

exports.services = async (req, res, next) => {

    try {
        var cat_id = req.params.cat_id;
        let result = await db.sequelize.query(`select * from service where service_category_id ='${cat_id}' `,
            {type: db.sequelize.QueryTypes.SELECT})
        return res.json(result);
    } catch (e) {
        console.log(e);
        throw e;
    }

}

exports.serviceDetail = async (req, res, next) => {
    try {
        var place_id = req.params.place_id;
        let result = await db.sequelize.query(`select * from service where id ='${place_id}' `,
            {type: db.sequelize.QueryTypes.SELECT})
        return res.json(result);
    } catch (e) {
        console.log(e);
        throw e;
    }

}


exports.createService = async (req, res, next) => {
    try {
        var body = req.body;


        const files = req.files;


        var sid = await apiService.serviceCreate({
            name: body.name,
            desc: body.desc,
            images: body.images,
            address: body.address,
            service_category_id: body.service_category_id,
            price: body.price,
            lat: body.lat,
            lng: body.lng,
            mobile: body.mobile,
            pincode: body.pincode


        });


        if (files) {

            var medias = [];
            files.forEach(function (file) {
                var filePath = file.path;
                var filename = path.basename(filePath);
                var fileSize = getFilesizeInBytes(filePath);
                let trayPath = envConfig.baseUrl + filePath.replace('uploads/', "");
                console.log(filename);
                //Todo move single

                var s = {
                    name: filename,
                    type: 'image',
                    image: trayPath,
                    thumb_image: null,
                    image_size: fileSize,
                    service_id: sid

                }
                medias.push(s);
            });

            if (medias.length !== 0) {
                apiService.serviceCreateImage(medias);
            }

        }

        res.json({success: true, message: "Success"});

    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error"});
    }
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    return stats["size"];
}

exports.createBanner = async (req, res, next) => {
    try {
        var body = req.body;
        await apiService.bannerCreate(
            {
                image: body.image,
                target_id: body.target_id,
                target_type: body.target_type,
            }
        );
        res.json({success: true, message: "Success"});
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error"});
    }

}

exports.createServiceCategory = async (req, res, next) => {
    try {


        var name = req.body.name;
        const file = req.file;
        if (file === undefined) {
            const error = new Error('Please choose files');
            error.httpStatusCode = 400;
            return next(error);
        } else if (name === "") {
            const error = new Error('Please enter app name');
            error.httpStatusCode = 400;
            return next(error);
        } else {
            var filePath = file.path;
            var body = req.body;
            let trayPath = envConfig.baseUrl + filePath.replace('uploads/', "");

            await apiService.serviceCategoryCreate(
                {
                    image:trayPath,
                    name: body.name,
                }
            );
            res.json({success: true, message: "Success"});
        }
    } catch (e) {
        console.log(e);
        res.json({success: false, message: "Error"});
    }
}


exports.addContactMessage = async (req, res, next) => {
    try {
        var body = req.body;
        await apiService.addContactMessage(
            {
                name: body.name,
                email: body.email,
                mobile: body.mobile,
                subject: body.subject,
                message: body.message,
            }
        );
        res.json({success: true, message: "Success"});
    } catch (e) {
        console.log(e);
        res.json({success: false});
    }
}
