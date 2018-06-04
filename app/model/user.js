'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, UUIDV4 } = app.Sequelize;

  const User = app.model.define('jdm_user', {
    employee_id: INTEGER(11),
    nickname: STRING(64),
    real_name: STRING(64),
    phone_number: STRING(32),
    username: STRING(64),
    password: STRING(32),
    type: INTEGER,
    avatar: STRING(1024),
    weibo: STRING(1024),
    wechat: STRING(1024),
    qq: STRING(1024),
    email: STRING(1024),
    profile: STRING(1024),
    birthday: DATE,
    gender: INTEGER(1),
    soft_delete: {
      type: INTEGER(1),
      defaultValue: 0,
    },
    create_time: {
      type: DATE,
      defaultValue: NOW,
    },
    update_time: {
      type: DATE,
      defaultValue: NOW,
    },
    create_guid: {
      type: STRING(36),
      defaultValue: UUIDV4,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  // User.add = async user => {
  //   return await this.create(user);
  // };

  User.findByUsername = async username => {
    return await User.findOne({
      where: {
        username,
        soft_delete: 0,
      },
    });
  };

  User.findByUserId = async userId => {
    return await User.findOne({
      where: {
        id: userId,
        soft_delete: 0,
      },
    });
  };

  User.findByPhoneNumber = async phone_number => {
    return await User.findOne({
      where: {
        phone_number,
        soft_delete: 0,
      },
    });
  };

  User.findByLogin = async login => {
    return await this.findOne({
      where: {
        login,
        soft_delete: 0,
      },
    });
  };

  return User;
};
