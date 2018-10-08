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

export function addAlexaCode(uid, phoneNumber, alexaCode)
{
        database.ref('alexa').child(phoneNumber).on('value', (snapshot) =>
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
                                        .then(() => callback(true, null))
                                        .catch((error) => callback(false, error));
                        }
                        else
                        console.log("Alexa code did not match");
                }
        });
                // .then((resp) => callback(true, resp))
                // .catch((error) => callback(false, error));
}

// on child added is supposed to only fire off when a new data object is added
export function getReport(phone, callback)
{
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
                });
                callback(true, snapshot);
        });
}

