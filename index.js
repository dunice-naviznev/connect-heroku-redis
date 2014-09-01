/**
 * connect-heroku-redis
 * Copyright(c) 2010 Michael Hemesath <mike.hemesath@gmail.com>
 * MIT Licensed
 */

var parse = require("url").parse;

/**
 * Return connect heroku redis store
 * @param {int} version
 * @return RedisStore
 * @api public
 */
module.exports = function(connect) {
  
  var RedisStore = require('connect-redis')(connect);
  
  function ConnectHerokuRedis(options) {
    var redis_url = process.env.REDISTOGO_URL || process.env.REDISCLOUD_URL;
    var redisToGo = redis_url || false;
    console.log("redisToGoURL", redisToGo);
    options = options || {};

    if (redisToGo) {
      options.host = options.host || redisToGo.host.split(":").shift();
      options.port = options.port || redisToGo.port;
      
      if (!options.pass && redisToGo.auth) {
        options.pass = options.pass || redisToGo.auth.split(":")[1];
      }
    }
    console.log("RedisStore options", options);
    RedisStore.call(this, options);
  }
  
  // Inherit from Connect Redis
  ConnectHerokuRedis.prototype = new RedisStore;
  
  return ConnectHerokuRedis;
}
