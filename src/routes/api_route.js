var express = require('express');
var router = express.Router();

var  api=require('../controller/api_controller')

router.get('/banner_with_service', api.fetchBannerServiceData)
router.get('/service/:cat_id', api.services)
router.get('/service_detail/:place_id', api.serviceDetail)
module.exports = router;
