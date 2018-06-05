'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW, UUIDV4 } = app.Sequelize;

  const Application = app.model.define('jdm_application', {
    name_cn: STRING(64),
    name_en: STRING(64),
    description: STRING(2048),
    soft_delete: {
      type: INTEGER(1),
      defaultValue: 0,
    },
    owner_id: INTEGER(11),
    updater_id: INTEGER(11),
    operation_manager_id: INTEGER(11),
    associate_url: STRING(1024),
    creator_id: INTEGER(11),
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

  Application.list = async name => {
    return await Application.findAndCountAll({
      attributes: [ 'id', 'name_cn', 'name_en', 'owner_id', 'updater_id', 'operation_manager_id', 'update_time' ],
      where: {
        $or: [
          {
            name_cn: {
              $like: `%${name}%`,
            },
          },
          {
            name_en: {
              $like: `%${name}%`,
            },
          },
        ],
        soft_delete: 0,
      },
      offset: (name - 1) * 15,
      limit: 15,
      order: [
        [ 'update_time', 'DESC' ],
      ],
    });
  };

  Application.findOneByName = async (name_cn, name_en) => {
    return await Application.findOne({
      where: {
        $or: [
          {
            name_cn,
          },
          {
            name_en,
          },
        ],
      },
    });
  };

  return Application;
};
