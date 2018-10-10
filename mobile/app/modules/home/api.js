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
                                                database.ref('reports').child(deviceId).push('')
                                                        .then(() => callback(true, null))
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
export function getReport(phone, callback)
{
        var reports = [];
        database.ref('reports').child(phone).on('value', (snapshot) =>{
                snapshot.forEach(function(childSnapshot){
                       
                        if (childSnapshot.child('latitude').exists() == false)
                        {
                                console.log("no gps found");
                                navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                                database.ref('reports').child(phone).child(childSnapshot.key).update({'latitude': position.coords.latitude, 'longitude': position.coords.longitude})
                                        },
                                        (error) => console.log(error),
                                        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                                    );
                               
                        }
                        reports.push([childSnapshot.val().description, childSnapshot.val().latitude, childSnapshot.val().longitude, childSnapshot.val().time, childSnapshot.val().type]);
                });
                console.log("REPORTS FROM DB:");
                console.log(reports);
                callback(true, reports);
        });
}