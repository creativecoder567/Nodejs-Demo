'use strict';

module.exports = (sequelize, Sequelize) => {
    const service_city = sequelize.define('service_city',
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
            tableName: 'service_city'
        },
    );



    service_city.associate = function (models) {
       // associations can be defined here
        service_city.hasMany(models.service, {
            foreignKey: 'service_city_id'
        })
    }

    return service_city;
}
