// Given the many-to-many relationship we're creating between Hashtags and Reviews, this file creates the join model needed to be able to join Hashtags and Reviews. 
// We're using the ids from Hashtags and ids from reviews to match hashtags associated with reviews, and reviews associated with any given hashtag. 
// This will make it easier for users to query reviews on certain hashtags. 
module.exports = function (sequelize, DataTypes) {
    const ReviewHashtag = sequelize.define("ReviewHashtag", {
        HashtagId: {
            type: DataTypes.UUID,
            field: "HashtagId",
            primaryKey: true
        },
        ReviewId: {
            type: DataTypes.UUID,
            field: "ReviewId",
            primaryKey: true
        }
    })

    return ReviewHashtag;
}