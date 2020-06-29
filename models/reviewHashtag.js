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