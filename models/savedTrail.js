// Creating our model schema for Saved Trails. Users can save trails to come back and look at in the future. 

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