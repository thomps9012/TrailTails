module.exports = function (sequelize, DataTypes) {
    var SavedTrail = sequelize.define("SavedTrail", {
        trailId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return SavedTrail
}