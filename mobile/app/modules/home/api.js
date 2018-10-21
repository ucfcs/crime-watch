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
                                                        callback(true, null)})
                                                .catch((error) => callback(false, error.message));
                                        })
                                        .catch((error) => callback(false, error.message));    
         
                }
                        else
                        callback(false, "Matching Alexa code not found.");
                }
        });
}

// on child added is supposed to only fire off when a new data object is added
export function setLocation(uid, deviceID, callback)
{
        database.ref('reports').child(deviceID).child('report').endAt().limitToLast(1).on('child_changed', function(snapshot)
        {
                console.log("LATEST REPORT ADDED KEY AND VAL:");
                console.log(snapshot.key + " " + snapshot.val());
                console.log("type descrption time exist:");
                console.log(snapshot.child('type').exists() + " " + snapshot.child('description').exists() + " " + snapshot.child('time').exists());
                if (snapshot.child('type').exists() && snapshot.child('description').exists() && snapshot.child('time').exists())
                        {
                                console.log("TYPE EXISTED");
                                if (!snapshot.child('latitude').exists())
                                {
                                        console.log("no gps found");
                                        navigator.geolocation.getCurrentPosition((position) => {
                                                //nine five four four zero one three zero two zero
                                                console.log("CHILD VALUEs TEST ~~~~~");
                                                console.log(snapshot.val().type + " " + snapshot.val().time + " " + snapshot.val().description);
                                                console.log("CHILD VALUE TEST ~~~~~");
                                                database.ref('users').child(uid).child('reports').push({
                                                        'type': snapshot.val().type, 
                                                        'description': snapshot.val().description, 
                                                        'time': snapshot.val().time, 
                                                        'latitude': position.coords.latitude, 
                                                        'longitude': position.coords.longitude})
                                                        .then(() =>
                                                        {
                                                                database.ref('users').child(uid).child('reports').on('value', function(snapshot)
                                                                {
                                                                        console.log(snapshot.val());
                                                                        callback(true, snapshot.val());
                                                                })
                                                        })
                                        },
                                        (error) => console.log(error),
                                        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                    );
                               
                                }
                        }
                callback(false, "Report was not valid");
        })
}

export function searchListener(deviceID, callback)
{
        database.ref('reports').child(deviceID).child('search').on('child_changed', (snapshot) =>{
                console.log('searching');
                console.log(snapshot);
        });
}
