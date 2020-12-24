'use strict';

module.exports = (sequelize, Sequelize) => {
    const service_media = sequelize.define('service_media',
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            type: {
                allowNull: false,
                type:   Sequelize.ENUM,
                values: ['image', 'video', 'youtube']

            },
            name: {
                type: Sequelize.STRING,
            },
            image: {
                type: Sequelize.STRING,
            },
            thumb_image: {
                type: Sequelize.STRING,
            },
            image_size:{
                type: Sequelize.BIGINT,
            },
            createdAt: {
                type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)'
            },
            service_id:{
                type: Sequelize.BIGINT,
            },
            updatedAt: {
                type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'
            }

        },

        {
            timestamps: false,
            // don't delete database entries but set the newly added attribute deletedAt
            // to the current date (when deletion was done). paranoid will only work if
            // timestamps are enabled
            paranoid: true,
            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: false,
            freezeTableName: true,
            // define the table's name
            tableName: 'service_media'
        },
    );
    service_media.associate = function (models) {
       // associations can be defined here

    }

    return service_media;
}
