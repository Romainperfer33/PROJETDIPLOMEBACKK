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
        prix: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        date_debut: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true
          },

    },)
}