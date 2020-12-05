'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env].DB;
const db = {};

let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.db, config.username, config.password, config, {query: {raw: true}});
}

const files = [];
const sortDir = maniDir => {
    const folders = [];
    const CheckFile = filePath => fs.statSync(filePath).isFile();
    const sortPath = dir => {
        fs
            .readdirSync(dir)
            .filter(file => file.indexOf(".") !== 0 && file !== "index.js" && (file !== "migrations") && (file !== "redshift-migrations"))
            .forEach(res => {
                const filePath = path.join(dir, res);
                if (filePath.indexOf("Schema") === -1) {
                    if (CheckFile(filePath)) {
                        files.push(filePath);
                    } else {
                        folders.push(filePath);
                    }
                }
            });
    };
    folders.push(maniDir);
    let i = 0;
    do {
        sortPath(folders[i]);
        i += 1;
    } while (i < folders.length);
};
sortDir(__dirname);

files.forEach(file => {
    console.log(file)
   // const model = sequelize.import(file);
    const model = require( file)(sequelize, Sequelize)
    console.log(model)

    db[model.name] = model;
});


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }

})
//  ;
Object.keys(db).forEach((modelName) => {
    db[modelName].sync().then(result => {
        // some logic
    }).catch(err => {
        console.error(err);
        // some logic
    })
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
