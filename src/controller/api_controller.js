const db = require('../model/index');
var apiService = require('../service/api_service');

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

        await apiService.serviceCreate({
            name: body.name,
            desc: body.desc,
            images: body.images,
            address: body.address,
            service_category_id: body.service_category_id,
            price: body.price,
        });

        res.json({success: true});

    } catch (e) {
        console.log(e);
        res.json({success: false});
    }
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
        res.json({success: true});
    } catch (e) {
        console.log(e);
        res.json({success: false});
    }

}

exports.createServiceCategory = async (req, res, next) => {
    try {
        var body = req.body;
        await apiService.serviceCategoryCreate(
            {
                image: body.image,
                name: body.name,
            }
        );
        res.json({success: true});
    } catch (e) {
        console.log(e);
        res.json({success: false});
    }
}

