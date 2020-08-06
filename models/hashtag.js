// Creating our hashtag model and associating hashtags with reviews in a many-to-many relationship. 
// One hashtag can be associated with many reviews, and one review can have many hashtags.

module.exports = function (sequelize, DataTypes) {
    // Defining the Hashtag model and defining data fields and types. 
    var Hashtag = sequelize.define("Hashtag", {
        title: {
            type: DataTypes.STRING,
        }
    })

    // Associating Hashtag model with review models. Setting up a join model called ReviewHashtags which will be used to join together hashtags and reviews.

    Hashtag.associate = function (models) {
        Hashtag.belongsToMany(models.Review, {
            through: "ReviewHashtags",
            as: "Reviews",
            foreignKey: "HashtagId"
        })
    }
    return Hashtag;
}