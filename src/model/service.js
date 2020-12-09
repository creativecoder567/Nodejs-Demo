'use strict';

module.exports = (sequelize, Sequelize) => {
    const service = sequelize.define('service',
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            desc: {
                type: Sequelize.STRING,
            },
            images: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            service_category_id: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DOUBLE,
            },
            createdAt: {
                type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)'
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
            tableName: 'service'
        },
    );

    service.associate = function (models) {
        // associations can be defined here
        service.belongsTo(models.service_category, {
            foreignKey: 'id',

        });
    }


    return service;
}
