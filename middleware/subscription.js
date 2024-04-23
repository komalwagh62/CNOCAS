const subscriptionService = require("../src/services/subscriptionService");


const checkSubscription = async (req, res, next) => {
    try {
        console.log(req,"ef")
        const subscription = await subscriptionService.getUserSubscription(req.user.id, req.body.subscription_type);
        if (subscription && subscription.length) {
            const expiryDate = new Date(subscription[0].expiry_date);
            const todaysDate = new Date();

            if (expiryDate > todaysDate) {
                
                return res.status(200).json({ message: "You are already subscribed" });
            } else {
                
                return res.status(401).json({ message: "Subscription has expired" });
            }
        } else {
            next();

        }
    } catch (error) {
        
        console.error("Error checking subscription:", error);
        return res.status(500).json({ message: "server error" });
    }
};


  

 
module.exports = checkSubscription;