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

export function getReports(phone, callback)
{
        var array = [];

        database.ref('reports').child(phone).on('value', (snapshot) =>{
                snapshot.forEach(function(childSnapshot){
                        array.push(childSnapshot);
                });
               
                callback(true, array);
        });
}

// on child added is supposed to only fire off when a new data object is added
export function setLocation(phone, callback)
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
                
        });
}

