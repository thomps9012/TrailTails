// Creating our review model by defining data fields and types. This will allow for users to store these datapoints when creating a review. 
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

    // Associating reviews with users, as a user must create the review. 
    // In addition, we're associating reviews with hashtags through the join model "ReviewHashtags"

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