module.exports = (sequelize, type) => {
    return sequelize.define('test', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        module: type.STRING,
        noOfQuestions: type.INTEGER,
    })
}