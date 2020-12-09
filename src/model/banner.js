'use strict';

module.exports = (sequelize, Sequelize) => {
    const child = sequelize.define('banner',
        {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            target_id: {
                type: Sequelize.INTEGER
            },
            target_type: {
                type: Sequelize.INTEGER
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
            tableName: 'banner'
        },
    );
    return child;
}
