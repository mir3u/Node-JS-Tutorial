module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        username:{
            type: type.STRING,
            validate: {
                isAlphanumeric: true
            }
        },
        email: {
            type: type.STRING,
            validate: {isEmail: true}},
        password: type.STRING,
        isAdmin: {
            type:type.BOOLEAN,
            defaultValue: false
        }
    })
}