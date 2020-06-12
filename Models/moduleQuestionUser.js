module.exports = (sequelize, type) => {
    return sequelize.define('moduleQuestionUser', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

    })
}