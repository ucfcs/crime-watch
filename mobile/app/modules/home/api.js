import { auth, database, provider } from "../../config/firebase";
import { functions } from "firebase";


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

export function getReports(uid, callback)
{
        var dbref = database.ref('users');
        database.ref('users').child(uid).child('reports').once('value')
                .then(snapshot => callback(true, snapshot));
}

// on child added is supposed to only fire off when a new data object is added
export function getReport(phone, callback)
{
        database.ref('reports').child(phone).on('value', (snapshot) =>{
                console.log("A new report was detected!");
                callback(true, snapshot);
        });
}

