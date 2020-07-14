module.exports = (sequelize, type) => {
    return sequelize.define('module', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        description: type.STRING,
        difficulty: type.STRING,
        author: type.STRING,
        type: type.STRING,
        noOfQuestions: type.INTEGER,
        hasTest:{
            type: type.BOOLEAN,
            defaultValue: false}
    })
}