module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Stage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        intitule: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descriptif: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        places: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
        },
        date_heure_debut: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_heure_fin: {
            type: DataTypes.INTEGER,
            allowNull: false,            
        }
    },)
}