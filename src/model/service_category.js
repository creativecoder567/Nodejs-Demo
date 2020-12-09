'use strict';

module.exports = (sequelize, Sequelize) => {
    const service_category = sequelize.define('service_category',
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
            image: {
                type: Sequelize.STRING,
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
            tableName: 'service_category'
        },
    );



    service_category.associate = function (models) {
       // associations can be defined here
        service_category.hasMany(models.service, {
            foreignKey: 'service_category_id'
        })
    }

    return service_category;
}
