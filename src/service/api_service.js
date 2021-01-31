const db = require('../model/index');
const service = db['service'];
const serviceCategory = db['service_category'];
const banner = db['banner'];
const contact_us = db['contact_us'];
const service_media = db['service_media'];
const serviceCity = db['service_city'];


exports.serviceCreate = async (data) => {
    try {
        var r = await service.create(data, {
            returning: true, individualHooks: true
        });
        return r.id;
    } catch (e) {
        console.log("eppp---", e);
        throw e;
    }
};


exports.serviceCreateImage = async (medias) => {


    try {
        var r = await service_media.bulkCreate(medias);
        return r;
    } catch (e) {
        console.log("eppp---", e);
        throw e;
    }
}

exports.serviceCategoryCreate = async (data) => {
    try {
        var r = await serviceCategory.create(data, {
            returning: true, individualHooks: true
        });
        return r;
    } catch (e) {
        console.log("eppp---", e);
        throw e;
    }
};


exports.bannerCreate = async (data) => {
    try {
        var r = await banner.create(data, {
            returning: true, individualHooks: true
        });
        return r;
    } catch (e) {
        console.log("eppp---", e);
        throw e;
    }
};

exports.addContactMessage = async (data) => {
    try {
        var r = await contact_us.create(data, {
            returning: true, individualHooks: true
        });
        return r;
    } catch (e) {
        console.log("eppp---", e);
        throw e;
    }
};

exports.addServiceCity = async (data) => {
    try {
        var r = await serviceCity.create(data, {
            returning: true, individualHooks: true
        });
        return r;
    } catch (e) {
        console.log("eppp---", e);
        throw e;
    }
};

