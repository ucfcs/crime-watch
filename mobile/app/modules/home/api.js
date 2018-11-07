import { database } from "../../config/firebase";


export function changeGender(user, gender, callback) 
{
        database.ref('users').child(user).update({'gender': gender})
                .then((resp) => callback(true, resp))
                .catch((error) => callback(false, error));
}

export function changePhone(user, phone, callback)
{
        database.ref('users').child(user).update({'phone': phone})
                .then((resp) => callback(true, resp))
                .catch((error) => callback(false, error));
}

export function addAlexaCode(uid, phoneNumber, alexaCode, callback)
{
        // will need to add functionality to detect if user already ahs a linked device
        database.ref('alexa').child(phoneNumber).once('value', (snapshot) =>
        {
                if (snapshot === null)
                {
                        console.log("ALEXA CODE WAS NULL");
                        // Error message
                }
                else
                {
                        var code = snapshot.child('code').val();
                        var deviceId = snapshot.child('deviceID').val();
                        if (code === alexaCode)
                        {
                                console.log("CODES MATCHED!");

                                // First call will update the deviceID in the user table
                                database.ref('users').child(uid).update({'deviceID': deviceId})
                                        .then(() =>{
                                                // Second call Creates a new deviceID-key object in the reports table
                                                database.ref('reports').child(deviceId).set({'report': '', 'search': {'bool': false, 'speech': ''}})
                                                .then(() => {
                                                        removeAlexaCode(phoneNumber);
                                                        callback(true, deviceId);
                                                })
                                                .catch((error) => callback(false, error.message));
                                        })
                                        .catch((error) => callback(false, error.message));    
         
                }
                        else
                        callback(false, "Matching Alexa code not found.");
                }
        });
}

export function removeAlexaCode(phoneNumber)
{
        if(phoneNumber && phoneNumber !== "")
                database.ref('alexa').child(phoneNumber).remove();
}

// on child added is supposed to only fire off when a new data object is added
export function setLocation(deviceID, callback)
{
        database.ref('reports').child(deviceID).child('report').endAt().limitToLast(1).on('child_added', (snapshot) =>{
                if (snapshot.child('latitude').exists() == false)
                {
                        console.log("adding current GPS location to new report");
                        navigator.geolocation.getCurrentPosition(
                                (position) => {
                                        database.ref('reports').child(deviceID).child('report').child(snapshot.key)
                                        .update({
                                                'latitude': position.coords.latitude,
                                                'longitude': position.coords.longitude})
                                        .then(function ()
                                        {
                                                database.ref('reports').child(deviceID).child('report').on('value', function (snapshot)
                                                {
                                                        callback(true, snapshot.val())
                                                })
                                        })
                                },
                                (error) => console.log(error),
                                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                );
                        
                }
                else
                        callback(false,  "Report already had coordinates");
        })
}

export function searchListener(deviceID, callback)
{
        database.ref('reports').child(deviceID).child('search').on('child_changed', (snapshot) => {
                console.log('searching request');
                
                if(snapshot.val() === true)
                {
                        console.log("Found true");

                        // At this point, we need to query the database using the current location and 
                        // comparing with locations of all other reports




                        var speechResponse = "There have been five major incidents in this area."
                        database.ref('reports').child(deviceID).child('search').set({'bool':'false', 'speech': speechResponse});
                }
                else
                {
                        callback(false);
                }
                
        })
}

export function getReports(callback)
{
        var reports = []
         database.ref('reports').on('value', (snapshot) => {
                snapshot.forEach(function (childSnapshot) {
                        var array = Object.values(childSnapshot.val().report);
                        reports.push(...array);
                })
                
                // return an array of all reports in the database
                callback(true, reports);
         })
}