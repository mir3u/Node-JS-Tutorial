module.exports = (sequelize, type) => {
    return sequelize.define('test', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        module: type.STRING,
        moduleId: type.INTEGER,
        noOfQuestions: type.INTEGER,
    })
}