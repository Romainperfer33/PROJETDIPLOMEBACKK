const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const stages = require('../mock-stages')
const stageModelSequelize = require ('../models/stage')
const userModelSequelize = require ('../models/user')

const sequelize = new Sequelize('projet_stages', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 8889
});


const stageModel = stageModelSequelize(sequelize,DataTypes);
const userModel = userModelSequelize(sequelize,DataTypes);

const initDb = () => {
    return sequelize.sync({force: true}) 
    .then(() => {
        stages.forEach((element) => {
            stageModel.create({
                intitule: element.intitule,
                descriptif: element.descriptif,
                places: element.places,
                prix: element.prix,
                image: element.image,
                date_debut: element.date_debut
                })
            })
            bcrypt.hash('mdp', 10)
            .then((hash) => {
                userModel.create({
                    username: 'romain',
                    password: hash,
                    roles: ['admin']
                })
            })
            .catch(err => console.log(err))

            bcrypt.hash('mdp', 10)
            .then((hash) => {
                userModel.create({
                    username: 'julie',
                    password: hash,
                    roles: ['user']
                })
            })
            .catch(err => console.log(err))
        })
        .catch(error => console.log(error))
    }

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = {
    sequelize, stageModel, userModel, initDb
}