module.exports = (sequelize, DataTypes) =>
    sequelize.define("reaction", {
        reaction: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // Don't add the timestamp attributes (updatedAt, createdAt).
        timestamps: false
    });


