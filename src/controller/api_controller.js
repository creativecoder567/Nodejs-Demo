const db = require('../model/index');

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


