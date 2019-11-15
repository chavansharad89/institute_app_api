const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Settings = require('./settings');

const basePath = `${path.join(__dirname, './../')}`;
// Database settings for the current environment
const dbSettings = Settings[Settings.env].db;

const sequelize = new Sequelize(
    dbSettings.database, 
    dbSettings.user, 
    dbSettings.password, 
    dbSettings
);
const db = {};

// Read all the files in this directory and import them as models
function recursiveModels(folderName = getModelBasePath()) {
    fs.readdirSync(folderName)
        .map((file) => {
            const fullName = path.join(folderName, file);
            const stat = fs.lstatSync(fullName);
            if (stat.isDirectory()) {
                recursiveModels(fullName);
            } else if ((file.indexOf('.') !== 0) && (file !== 'index.js')) {
                const model = sequelize.import(fullName);
                db[model.name] = model;
            }
        });
}

recursiveModels();
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

function getModelBasePath() {
    return `${basePath}models/`;
}