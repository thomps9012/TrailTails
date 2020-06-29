module.exports = function (sequelize, DataTypes) {
    var Hashtag = sequelize.define("Hashtag", {
        title: {
            type: DataTypes.STRING,
        }
    })

    Hashtag.associate = function (models) {
        Hashtag.belongsToMany(models.Review, {
            through: "ReviewHashtags",
            as: "Reviews",
            foreignKey: "HashtagId"
        })
    }
    return Hashtag;
}