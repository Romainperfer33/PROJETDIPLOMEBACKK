let stages = require('../mock-stages')
const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { stageModel, sequelize } = require('../db/sequelize');
const stage = require('../models/stage');

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

exports.deleteStage = (req, res) => {
    stageModel.findByPk(req.params.id)
        .then(stage => {
            if (stage === null) {
                const message = `Le coworking demandé n'existe pas.`
                return res.status(404).json({ message })
            }
            return stageModel.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    const message = `Le stage ${stage.name} a bien été supprimé.`
                    res.json({ message, data: coworking });
                })
        })
        .catch(error => {
            const message = `Impossible de supprimer le stage.`
            res.status(500).json({ message, data: error })
        })
}

exports.findStageByPk = (req, res) => {
    // Afficher le coworking correspondant à l'id en params, en le récupérant dans la bdd     findByPk()
    stageModel.findByPk(req.params.id)
        .then(stage => {
            if (stage === null) {
                const message = `Le stage demandé n'existe pas.`
                res.status(404).json({ message })
            } else {
                const message = "Un stage a bien été trouvé."
                res.json({ message, data: stage });
            }
        })
        .catch(error => {
            const message = `La liste des stages n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}

exports.findStages = (req, res) => {
    stageModel.findAll()
    .then((elements)=>{
        console.log(elements)
        if(!elements.length){
            return res.json({message: "Aucun stage ne correspond à votre recherche"})    
        }
        const msg = 'La liste des stages a bien été récupérée en base de données.'
        res.json({message: msg, data: elements})
})} 

exports.updateStage = (req, res) => {
    console.log(req.body)
    // Modifier le stage en base de données qui correspond à l'id spécifé dans les params
    stageModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((stage) => {
        console.log(stage)
        if(stage === null){
            const msg = "Le stage demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le stage a bien été modifié."
            res.json({message: msg, data: stage})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible de mettre à jour le coworking."
        res.status(500).json({message: msg})
    })
}