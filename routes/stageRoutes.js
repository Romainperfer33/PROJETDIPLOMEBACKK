const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stageController')

router
    .route('/')
    .post(stageController.createStage)

    module.exports = router; 