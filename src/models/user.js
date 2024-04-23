const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const db = require("../../config/database");

const User = db.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    uname: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
});


User.beforeCreate(async (user, options) => {
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10); 
        user.password = hashedPassword;
    }
});


User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 10); 
        user.password = hashedPassword;
    }
});

module.exports = User;
