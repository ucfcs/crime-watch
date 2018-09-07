import { auth, database, provider } from "../../config/firebase";

export function setGender (user, gender, callback)
{
  database.ref('users').child(user.uid).once('value')
    .then(function() 
    {
        console.log("Here");
    })
    .catch(error => callback(false, null, error));
}

export function userReports (user, callback)
{
  // testing a simple return call
    return 'Here is a list of reports';
}
