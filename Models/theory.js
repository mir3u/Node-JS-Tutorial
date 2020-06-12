module.exports = (sequelize, type) => {
    return sequelize.define('theory', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        question: type.STRING,
        example: type.STRING,
        difficulty: type.STRING,
    })
}