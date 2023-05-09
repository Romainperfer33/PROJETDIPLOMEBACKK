const { Sequelize, DataTypes } = require('sequelize');
const stages = require('../mock-stages')
const stageModelSequelize = require ('../models/stage')

const sequelize = new Sequelize('Projet_stages', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 8889
});


const stageModel = stageModelSequelize(sequelize,DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}) 
    .then(() => {
        stages.forEach((element) => {
            stageModel.create({
                intitule: element.intitule,
                descriptif: element.descriptif,
                places: element.places,
                prix: element.prix,
                date_heure_debut: element.date_heure_debut,
                date_heure_fin: element.date_heure_fin,
            })
            })
        }

)}

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = {
    sequelize, stageModel,initDb
}