const { DataTypes} = require("sequelize");
const db = require("../../config/database");

const Subscription = db.define("Subscription", {
    subscription_id: { type:DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey:true},
    user_id : {type:DataTypes.UUID, unique:true},
    subscription_status: {type:DataTypes.STRING},
    expiry_date:{ type: DataTypes.STRING},
    subscription_type: {type:DataTypes.STRING},
    price:{type:DataTypes.STRING}

});

module.exports = Subscription

