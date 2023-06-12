const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { userModel, sequelize } = require('../db/sequelize');
const bcrypt = require("bcrypt");

exports.createUser = (req, res) => {
    let newUser = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error('Erreur lors de la génération du sel :', err);
            return res.status(500).json(err);
        } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.error('Erreur lors du hachage du mot de passe :', err);
                    return res.status(500).json(err);
                } else {
                    userModel.create({
                        username: newUser.username,
                        password: hash
                    }).then((el) => {
                        const msg = 'Un utilisateur a bien été ajouté.';
                        res.json({ message: msg, data: el });
                    }).catch(error => {
                        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error });
                        }
                        res.status(500).json(error);
                    });
                }
            });
        }
    });
};
