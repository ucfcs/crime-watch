import { auth, database, provider } from "../../config/firebase";


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
                                database.ref('users').child(uid).update({'deviceID': deviceId})
                                        .then(() =>
                                        {
                                                
                                        })
                                        .catch((error) => callback(false, error.message));    
                                        
                                database.ref('reports').child(deviceId).set({'report': '', 'search': {'bool': false, 'speech': ''}})
                                .then(() => callback(true, null))
                                .catch((error) => callback(false, error.message));
                }
                        else
                        callback(false, "Matching Alexa code not found.");
                }
        });
}

// on child added is supposed to only fire off when a new data object is added
export function setLocation(deviceID, callback)
{
        // Look for a newly added report in the reports table, and add that report into the user table
        // under user -> reports
        database.ref('reports').child(deviceID).child('report').on('child_added', (snapshot) =>{
      
                
                if (snapshot.child('latitude').exists() == false)
                {
                        console.log("no gps found");
                        navigator.geolocation.getCurrentPosition(
                                (position) => {
                                        database.ref('users').child(uid).child(reports).push({
                                                'description': snapshot.val().description,
                                                'latitude': position.coords.latitude, 
                                                'longitude': position.coords.longitude,
                                                'time': snapshot.val().time,
                                                'type': snapshot.val().type
                                        })
                                },
                                (error) => console.log(error),
                                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                );
                        
                }
                
                callback(true, null);
        });
}

export function searchListener(deviceID, callback)
{
        database.ref('reports').child(deviceID).child('search').on('child_changed', (snapshot) =>{
                console.log('searching');
                console.log(snapshot);
        });
}

/*
// on child added is supposed to only fire off when a new data object is added
export function getReport(deviceID, callback)
{
        database.ref('reports').child(deviceID).endAt().limitToLast(1).on('child_added', (snapshot) =>{
    
               console.log(snapshot);
               
               callback(true, snapshot);
        });
}
*/