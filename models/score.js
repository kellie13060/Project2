module.exports = function (sequelize, DataTypes) {
    var Score = sequelize.define("Score", {
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });

    Score.associate = function (models) {
        Score.belongs(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Score;
};