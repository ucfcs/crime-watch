'use-strict';
const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
const appID = 'amzn1.ask.skill.eec7754e-6d35-4a6a-a5d7-a60f4980f21c';
const helpMessage = '';
const helpReprompt = 'What can I help you with?';
const https = require('https');
const firebase = require('firebase');

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyD-0yZJWGt4v2jUKKN7FbcsVlxQJk_Anhg',
    authDomain: '340660938605-ar1s03o0n9nfai1gf3mehnhd9ldvobua.apps.googleusercontent.com',
    databaseURL: 'https://crime-watch-18b0e.firebaseio.com',
    projectId: 'crime-watch-18b0e',
    storageBucket: 'crime-watch-18b0e.appspot.com',
    messagingSenderId: '340660938605'
};


// Prevents firebase from initializing this app multiple times
if (!firebase.apps.length)
    firebase.initializeApp(config);


// Handlers
const handlers = {
    'LaunchRequest': function ()
    {
        this.emit(':ask', "Welcome to Crime Watch", "If you haven't already, link your Crime Watch account by saying, add user");
    },
    'UserIntent': function ()
    {
        var speechOutput = '';
        const session = this.event.session;
        const intent = this.event.request.intent;

        let updatedIntent = intent.dialogState;

        if (intent.dialogState === "STARTED")
        {
            this.emit(':elicitSlot', 'phone', speechOutput, '');
        }
        else if (intent.dialogState !== "COMPLETED")
        {
            if (intent.slots.phone.value)
            {
                session.attributes.phone = intent.slots.phone.value;
                
                var code = generateCode();

                linkAccount(this, code, intent.slots.phone.value, session.attributes.deviceID, function (object)
                {
                    // end the session here
                    object.emit(":ask", "Your code is " 
                      + code[0] + ', '
                      + code[1] + ', '
                      + code[2] + ', '
                      + code[3] + ', '
                      + code[4] + ', '
                      + code[5] 
                      + ". Please enter this into your Crime Watch App", "Your code is " + code);
                });


                // ==================================================================================================
                /*
        				firebaseLogin(this, session, function (object, session, data) 
        				{
        					console.log("Received authenticated user");
        
        					if(data)
        					{
        					  session.attributes.uid = data.user.uid;
        					  // will need to svae uid into dynamodb later
        					  saveUser(session.attributes.deviceID, session.attributes.phone);
        							object.emit(':ask', "Your user account has been successfully updated.", '');
        					}
        					else
        					{
        					  console.log("ERROR");
        					}
        
        				});
        				*/
                // ==================================================================================================
            }
            else
            {
                this.emit(':delegate', updatedIntent);
            }
        }
        else
        {
            return updatedIntent;
        }

        return null;
    },
    'ReportIntent': function ()
    {
        var speechOutput = '';
        const session = this.event.session;
        const intent = this.event.request.intent;

        if (session.attributes.writing === false)
        {
            this.emit(":ask", "It seems like you haven't registered a phone number. Please do so by saying , add user", '');
        }
        else
        {
            if (this.event.request.dialogState !== "COMPLETED")
            {
                var type = intent.slots.type.value;
                var description = intent.slots.description.value;

                this.emit(":delegate")
                delegateReport(this, session.attributes.deviceID, type, description);
            }
            else
            {
                delegateReport(this, session.attributes.deviceID, type, description);
                this.response.speak('Thank you for the report, please make sure your Crime Watch App is running on your mobile device. Remember to drive safely!');
                this.emit(':responseReady');
            }
        }
    },
    'AMAZON.FallbackIntent': function ()
    {
        this.emit(':ask', "I couldn't understand that, please try again.", "Remember to stay off your phone while driving.");
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
        this.session.attributes = [];
        this.emit(":ask", "Got it", "ok");
    },
    'AMAZON.StopIntent': function ()
    {
        var stopMessage = 'Thank you for using Crime Watch. Stay safe on the road!';
        this.response.speak(stopMessage)
        this.emit(':responseReady');
    },
};

function delegateReport(object, deviceID, type, description)
{
    if (type && description)
    {
        // access api here
        console.log("Saving to Firebase");
        makeReport(object, deviceID, type, description, function (object)
        {
            object.emit(":ask", "success", '');
        });
        
        var stopMessage = "Thanks for the report, remember to have your Crime Watch App open on your Mobile device";
        this.response.speak(stopMessage)
        this.emit(':responseReady');
    }
}

function generateCode()
{
  var code = [];
  
  for (var i = 0; i < 6; i++)
  {
    var rand = Math.floor(Math.random() * 10);
    code.push(rand.toString());
  }
  
  return code;
}


// API calls ==================================================================================

function linkAccount(object, code, phone, deviceID, callback)
{
    deviceID = deviceID.split('.')[3];
    code = code.toString();

    firebase.database().ref('alexa').child(phone).set(
        {
            'code': code,
            'deviceID': deviceID
        })
        .then(function (data)
        {
            console.log('success');
            callback(object);
        })
        .catch(function (error)
        {
            console.log(error);
        });
}

// Connects to an instance of firebase 
function makeReport(object, deviceID, type, description, callback)
{
    var date = new Date();
    var longitude = '';
    var lattitude = '';
    deviceID = deviceID.split('.')[3];

    firebase.database().ref('reports').child(deviceID).push(
    {
        'type': type,
        'time': date.toDateString(),
        'description': description,
    });

    callback(object);
}

/*
function firebaseLogin (object, session, callback) 
{
  firebase.auth().signInWithEmailAndPassword("ton.henry92@gmail.com", "password")
             .then(function(firebaseUser) {
                console.log("Login successful");
                console.log(firebaseUser.user.uid);
                callback(object, session, firebaseUser);
             })
            .catch(function(error) {
                 // Error Handling
                 console.log("error");
            });
}
*/

/*
// updates user information in AWS DynamoDb
function saveUser (deviceID, phone)
{
    const AWS = require('aws-sdk');
    AWS.config.update({region: 'us-east-1'});
    // Create the DynamoDB service object
    var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

    var params = {
      TableName: 'Users',
      Item: {
        'key' : {S: deviceID},
        'phone': {S: phone}
      }
    };
    console.log("Attempting to access db");
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
}
*/

/*
// Checks for user existence in AWS DynamoDb
function getUser (deviceID, log)
{
    const AWS = require('aws-sdk');
    AWS.config.update({region: 'us-east-1'});
    // Create the DynamoDB service object
    var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

    var params = 
    {
      TableName: 'Users',
      Key: {
        'key' : {S: deviceID},
      },
      ProjectionExpression: 'phone'
    };
    
    console.log("Attempting to access db");
    // Call DynamoDB to add the item to the table
    ddb.getItem(params, function(err, data) 
    {
      if (err) 
      {
        console.log("Error", err);
      } 
      else 
      {
        try
        {
          console.log("Success", data.Item.phone.S);
          log(data.Item.phone.S)
        }
        catch (err)
        {
          log(null);
        }
      }
    });
}
*/

// Checks for the existence of the device ID on the reports table
function authenticate(deviceID, callback)
{
    deviceID = deviceID.split('.')[3];

    firebase.database().ref('reports').child(deviceID).once('value', (snapshot) =>
    {
        if (snapshot.exists())
            callback(true);
        else
            callback(false);
    });
}

exports.handler = function (event, context, callback)
{
    context.callbackWaitsForEmptyEventLoop = false
    
    var index = '';
    var phone = '';
    var type = '';
    var description = '';
    var writing = false;
    const deviceID = event.context.System.device.deviceId;

    // Check firebase to see if this device has been linked to a Crime Watch account
    authenticate(deviceID, function (success)
    {
        if (success)
        {
            console.log('Verified');
            writing = true;
        }
        else
        {
            console.log('User info not found');
            writing = false;
        }

        if (event.session.attributes == null)
        {
            event.session.attributes = {
                index,
                phone,
                writing,
                deviceID,
                type,
                description
            };
        }

        const alexa = Alexa.handler(event, context, callback);
        alexa.appId = appID;
        alexa.registerHandlers(handlers);
        alexa.execute();
    });
};