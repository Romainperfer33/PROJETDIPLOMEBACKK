let stages = require('../mock-stages')
const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { stageModel, sequelize } = require('../db/sequelize')

exports.createStage = (req, res) => {
    let newStage = req.body;
    console.log("newStage: ", newStage);
        stageModel.create({
            intitule: newStage.intitule,
            descriptif: newStage.descriptif,
            places: newStage.places,
            prix: newStage.prix,
            image: newStage.image,
            date_debut: newStage.date_debut,
            
    }).then((el) => {
        console.log("stage créé: ", el);
        const msg = 'Un stage a bien été ajouté.'
        res.json({ message: msg, data: el })

    }).catch(error => {
        console.log("erreur lors de la création du stage: ", error);
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        res.status(500).json(error)
    })
}
