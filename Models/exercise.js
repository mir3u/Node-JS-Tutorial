module.exports = (sequelize, type) => {
    return sequelize.define('exercises', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: type.STRING,
        codeExample: type.STRING,
        difficulty: type.STRING,
        answer: type.STRING,
    })
}