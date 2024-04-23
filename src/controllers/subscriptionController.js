const subscriptionService = require("../../src/services/subscriptionService");

exports.addUserSubscription = async (req,res) => {
    try{
        
        let expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        let newSubscription = {
        user_id : req.user.id,
        subscription_status: 'Active',
        expiry_date: expiryDate.toString(),
        subscription_type: req.body.subscription_type,
        price: req.body.price}
        console.log(newSubscription,"swefr")
        const subscription = await subscriptionService.addUserSubscription(newSubscription);

        res.status(201).json(subscription);
    }catch(error){
        console.log(error,"yghj")
        res.status(500).json({error: "Internal Error"});
    }
};


exports.getUserSubscription = async (req,res) => {
    try{
        const subscription = await subscriptionService.getUserSubscription(req.body.user_id,req.body.subscription_type);
        res.status(201).json(subscription);
    }catch(error){
        res.status(500).json({error: "Internal Server Error"});
    }
};




