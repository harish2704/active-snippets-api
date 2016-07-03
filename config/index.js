var path = require('path');

var _ = require('lodash'),
  dbConfigs = require('./database.json'),
  env = process.env.NODE_ENV || 'development',
  envConfig = {},
  defaultConfig = {
    appRoot: path.resolve( __dirname + '/..' ),
    SITE_ROOT: 'http://localhost:8000',
    cookieName: 'xxyyzz.sid',
    cookieSecret: 'NByueirjslmuies789@#)',
    mail:{
      email: 'admin@xxyyzz.com',
      authStr: 'smtps://user%40gmail.com:pass@smtp.gmail.com',
    },
    fbLogin:{
      appId: 'xxxxxxxxxxxxxxxx',
      appSecret: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
    },
    googleLogin:{
      appId: 'ggggggggggggggggggggggggggggggggggggggggggggg.apps.googleusercontent.com',
      appSecret:'ssssssssssssssssssssssss'
    },
    env: 'development',
    port: 8000,
  },
  config;

try {
  envConfig = require('./env/' + env );
} catch(e){
  console.log( 'Failed to require config file: ', 'env/'+ env );
  envConfig = {};
}

config = _.defaults( {}, envConfig, defaultConfig );
config.db = dbConfigs[env];
config.env = env;

module.exports = config;

