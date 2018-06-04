'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {
    sequelize: {
      dialect: 'mysql',
      database: 'pjs_json_data_manager',
      host: '127.0.0.1',
      port: '3306',
      username: 'root',
      password: 'irvin1234.',
    },
    security: {
      csrf: {
        ignore: () => true,
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: null,
        db: 0,
      },
    },
    logger: {
      dir: '/var/log/nodejs',
    },
  };

  config.view = {
    root: path.join(appInfo.baseDir, 'app/assets'),
    mapping: {
      '.js': 'assets',
    },
  };

  config.assets = {
    publicPath: '/public',
    devServer: {
      command: 'roadhog dev',
      port: 8000,
      env: {
        BROWSER: 'none',
        DISABLE_ESLINT: true,
        SOCKET_SERVER: 'http://127.0.0.1:8000',
        PUBLIC_PATH: 'http://127.0.0.1:8000',
      },
      debug: true,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525738779809_7566';

  // add your config here
  config.middleware = [
    'auth',
  ];

  return config;
};
