module.exports = function (sequelize, DataTypes) {
    var SavedTrail = sequelize.define("SavedTrail", {
        trailId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    SavedTrail.associate = function (models) {
        SavedTrail.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return SavedTrail
}