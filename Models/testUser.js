module.exports = (sequelize, type) => {
    return sequelize.define('test_user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        testId: type.INTEGER,
        userId: type.INTEGER,
        moduleName: type.STRING,
        precentageObtained: type.STRING
    })
}