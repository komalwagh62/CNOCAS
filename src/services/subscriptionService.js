const Subscription = require("../../src/models/subscription");

exports.addUserSubscription = async (subscriptionData) => {
    return Subscription.create(subscriptionData);
}

exports.getUserSubscription = async (user_id,subscription_type) => {
 return Subscription.findAll({
    where: {
        user_id: user_id,
        subscription_type:subscription_type
    }
 })
}

