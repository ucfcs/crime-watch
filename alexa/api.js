'use-strict';
const https = require('https');
const clientID = 'RxFw4Gnn8h';

module.exports = 
{
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
}