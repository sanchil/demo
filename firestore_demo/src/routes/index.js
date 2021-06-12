/**
 * #############################################################
 * 
 * To switch of caching simply use 0 as the first parameter. 
 *  
 *  
 * #############################################################
 */

var express = require('express');
var controllers = require('../controllers');
var lib = require('../lib');
var router = express.Router();

const cache_expire = process.env.NICEAPP_CACHE_MAX_AGE ? parseInt(Number(process.env.NICEAPP_CACHE_MAX_AGE)) : 3600;
//const cache_onoff = process.env.CACHEONOFF ? parseInt(Number(process.env.CACHEONOFF)) : 1;

var cachebool = (process.env.REDIS_HOST && process.env.REDIS_PORT && process.env.CACHEONOFF&& (process.env.CACHEONOFF==1));
console.log("Routes Cache bool is: ",cachebool);

// to switch off caching use 0 as first
// parameter to lib.cacheResults(0,cache_expire);

router
  .route('/')
  .get(controllers.basicContrl,lib.writeRedisCache(cachebool,cache_expire));

  router
  .route('/health')
  .get(controllers.healthReportCtrl);

  router
  .route('/:collection/:id')
  .get(controllers.readOneCtrl, lib.writeRedisCache(cachebool,cache_expire))
  .post(controllers.updateDocCtrl)
  .delete(controllers.deleteDocCtrl)
  

router
  .route('/:collection')
  .get(controllers.readManyCtrl, lib.writeRedisCache(cachebool,cache_expire))
  .post(controllers.writeCtrl)


module.exports = router;
