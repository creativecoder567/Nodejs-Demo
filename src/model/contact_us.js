'use strict';

//id,name , email, mobile, subject ,  message,
module.exports = (sequelize, Sequelize) => {
    const contact_us = sequelize.define('contact_us',
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
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            mobile: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            subject: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            message: {
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
            tableName: 'contact_us'
        },
    );
    return contact_us;
}
