module.exports = function (sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trailName: {
            type: DataTypes.STRING
        },
        trailId: {
            type: DataTypes.STRING
        },
        overallStars: {
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

    Review.associate = function (models) {
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        Review.belongsToMany(models.Hashtag, {
            through: "ReviewHashtags", 
            as: "Hashtags",
            foreignKey: "ReviewId"
        });
    }

    return Review;
}