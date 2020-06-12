const Sequelize = require('sequelize')
const UserModel = require('../Models/user')
const ExerciseModel = require('../Models/exercise')
const ModuleModel = require('../Models/module')
const TestModel = require('../Models/test')
const ModuleQuestionUserModel = require('../Models/moduleQuestionUser')


require('dotenv').config({ path: '../.env' })
const  host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
// const port = process.env.DB_PORT;
const database = process.env.DB_DB;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const User = UserModel(sequelize, Sequelize)
const Module = ModuleModel(sequelize,Sequelize)
const Exercise = ExerciseModel(sequelize,Sequelize)
const Test = TestModel(sequelize,Sequelize)
// const ModuleQusetionUser = ModuleQuestionUserModel(sequelize,Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const QuestionUser = sequelize.define('module_ex_tag', {})
// const Blog = BlogModel(sequelize, Sequelize)
// const Tag = TagModel(sequelize, Sequelize)

Exercise.belongsTo(Module)
// Module.belongsToMany(Exercise,{through:ModuleQuestionUser, unique: false})
Exercise.belongsToMany(User,{through:QuestionUser, unique: false})
User.belongsToMany(Module,{through:QuestionUser, unique: false})
    // , { through: BlogTag, unique: false })
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
// Blog.belongsTo(User);

sequelize.sync()
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    User,
    Module,
    Exercise,
    Test
    // Blog,
    // Tag
}