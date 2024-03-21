const {Sequelize} = require("sequelize");

const sequelize =new Sequelize(
    "backend",
    "test",
    "password",
    {
        host : "localhost",
        dialect: "postgres",
        
        
    }

);

module.exports = sequelize;


