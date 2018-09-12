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