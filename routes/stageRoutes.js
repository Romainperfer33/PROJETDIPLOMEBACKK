const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stageController')


router
    .route('/')
    .get(stageController.findStages)
    .post(stageController.createStage)

router
    .route('/:id')
    .get(stageController.findStageByPk)
    .put(stageController.updateStage)
    .delete(stageController.deleteStage);

module.exports = router; 