module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        difficultyStars: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashtags: {
            type: DataTypes.STRING
        }


    })

    return Review;
}