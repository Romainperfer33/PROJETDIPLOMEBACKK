let stages = require('../mock-stages')
const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { stageModel, sequelize } = require('../db/sequelize')

exports.createStage = (req, res) => {
    let newStage = req.body;
        
        stageModel.create({
            intitule: newStage.intitule,
            descriptif: newStage.descriptif,
            places: newStage.places,
            prix: newStage.prix
    }).then((el) => {
        const msg = 'Un coworking a bien été ajouté.'
        res.json({ message: msg, data: el })
    }).catch(error => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        res.status(500).json(error)
    })
}
