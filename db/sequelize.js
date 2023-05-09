const { Sequelize, DataTypes } = require('sequelize');
const stages = require ('../mock-stages')
const stageModelSequelize = require ('../controllers/stageController')

const sequelize = new Sequelize('Projet_stages', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 8889
});

const stageModel = stageModelSequelize (sequelize,DataTypes)

const initDb = () => {
    return sequelize.sync({force: true}) 
    .then(() => {
        // création des 11 coworkings dans la bdd, avec une boucle, 
        // message à afficher en console : La liste des {11} coworkings a bien été créée.
        coworkings.forEach((element) => {
            CoworkingModel.create({
                name: element.name,
                price: element.price,
                address: element.address,
                superficy: element.superficy,
                capacity: element.capacity,
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