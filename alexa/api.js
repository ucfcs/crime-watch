'use-strict';
const https = require('https');
const clientID = 'RxFw4Gnn8h';

const Admin = require('firebase-admin')
const serviceAccount = require('./firebase-admin.json');


Admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crime-watch-18b0e.firebaseio.com"
  });

 var database = Admin.firestore();

module.exports = 
{
    makeReport: function (user, type, location, time)
    {
      database.ref('users').child(user).child('reports').update({
        'location': location,
        'time': time,
        'type': type
      })
      .then((resp) => callback(true, resp))
      .catch((error) => callback(false, error));
    },

    saveUser: function (deviceID, phone)
    {
        database.ref('users').child(phone).update({'deviceID': deviceID})
                .then((resp) => callback(true, resp))
                .catch((error) => callback(false, error));
    },

    getUser: function (deviceID)
    {
      database.ref('users').child(deviceID).once('deviceID')
        .then(function(snapshot) 
        {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(data);
        })
        .catch(error => callback(errorfalse, null, error));
    }

    /*
    saveUser: function (deviceID, phone)
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
    },
    */
    /*
    getUser: function (deviceID, log)
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
}