'use-strict';
var API = require('./api');

module.exports = 
{
    // Add user info to dynamoDB
    userIntent: function (object)
    {
        var speechOutput = '';
        const session = object.event.session;
        const intent = object.event.request.intent;

        let updatedIntent = intent.dialogState;
        
        if (intent.dialogState === "STARTED") 
        {
            object.emit(':elicitSlot', 'phone', speechOutput, '');   
        } 
        else if (intent.dialogState !== "COMPLETED") 
        {
            if (intent.slots.phone.value) 
            {
                session.attributes.phone = intent.slots.phone.value;
                API.saveUser(session.attributes.deviceID, session.attributes.phone);
                object.emit(':ask', "Your user account has been successfully updated.", '');   
            } 
            else 
            {
                object.emit(':delegate', updatedIntent);
            }
        } 
        else 
        {
            return updatedIntent;
        }
        return null;
    },
    
    reportIntent: function (object, database)
    {
        var speechOutput = '';
        var repromptText = '';
        const session = object.event.session;
        const intent = object.event.request.intent;
       
        API.getUser(object.event.session.attributes.deviceID, function callback (user)
        {
            // check to see if the user has an account with crime watch already 
            if (user)
            {
                //object.emit(":ask", 'Okay, your account has been found. You are able to make reports now.', '');
                API.makeReport(user, 'vehicle', '101 alafaya trail', '11:00pm');
            }
            else
            {
                object.emit(":ask", "It seems like you haven't linked your Crime Watch account. Just say , add user, to get your account set up.", '');
            }
        });
    

        // check to see if phone number exists in firebase
        

    }

}