'use-strict';
const Alexa = require('alexa-sdk');
const Intents = require('./intents');
const API = require('./api');

const appID = '';
const helpMessage = '';
const helpReprompt = 'What can I help you with?';


// Handlers
const handlers = 
{
    'LaunchRequest': function () 
    {
        this.emit(':ask', "Welcome to Crime Watch", "If you haven't already, add your Crime Watch account by saying, add user");
    },
    'UserIntent': function ()
    {
        Intents.userIntent(this);
    },
    'ReportIntent': function ()
    {
        Intents.reportIntent(this);
    },
    'AMAZON.FallbackIntent': function () 
    {
        this.emit(':ask', "Hello", "Hi");
    },
    'AMAZON.HelpIntent': function () 
    {
        const speechOutput = helpMessage;
        const reprompt = helpReprompt;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () 
    {
        this.event.session.attributes = [];
        this.emit(":ask", "got it", "ok");
    },
    'AMAZON.StopIntent': function () 
    {
        var stopMessage = 'Bye';
        this.response.speak(stopMessage)
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) 
{
    var index = '';
    var phone = '';
    const deviceID = event.context.System.device.deviceId;
    
    if (event.session.attributes == null)
    {
        event.session.attributes = {index, phone, deviceID};
    }

    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = appID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};