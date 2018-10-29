import { auth, database, provider } from "../../config/firebase";

//Register the user using email and password
export function register(data, callback) 
{
    console.log("REGISTER DATA");
    console.log(data);
    const { email, password, phone, username } = data;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((resp) => createUser({ username, uid:resp.user.uid }, phone, email, callback))
        .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser (user, phone, email, callback) 
{
   
    const userRef = database.ref().child('users');
    var email = email;
    var phone = phone;
    var gender = '';
    var deviceID = '';
    var reports = [''];
    userRef.child(user.uid).update({ ...user, email, phone, gender, deviceID, reports })
        .then(() => callback(true, user, null))
        .catch((error) => callback(false, null, {message: error}));
}

//Sign the user in with their email and password
export function login(data, callback) 
{
    const { email, password } = data;

    auth.signInWithEmailAndPassword(email, password)
        .then((resp) => getUser(resp.user, callback))
        .catch((error) => callback(false, null, error));
}

export function getUser(user, callback) 
{
    database.ref('users').child(user.uid).once('value')
        .then(function(snapshot) 
        {
            const exists = (snapshot.val() !== null);
            if (exists) user = snapshot.val();
            if (user.deviceID && user.deviceID != "")
            {
                database.ref('reports').child(user.deviceID).child('report').once('value')
                .then(function(reportsSnapshot)
                {
                    user.reports = [];
                    reportsSnapshot.forEach(function(report) {
                        
                        user.reports.push({
                            'date': report.val().date,
                            'type': report.val().type, 
                            'description': report.val().description, 
                            'time': report.val().time, 
                            'latitude': report.val().latitude, 
                            'longitude': report.val().longitude
                        });
                    })
                    const data = { exists, user };
                    callback(true, data, null);
                })
                .catch(error => 
                {
                    const data = { exists, user }
                    callback(true, data, error);
                });
            }
            else
            {
                const data = { exists, user }
                callback(true, data, null);
            }
        })
        .catch(error => callback(false, null, error));
}

//Send Password Reset Email
export function resetPassword(data, callback) 
{
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut (callback) 
{
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        });
}
