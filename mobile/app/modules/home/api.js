import { auth, database, provider } from "../../config/firebase";


//Send Password Reset Email
export function changeGender(user, gender, callback) 
{
  console.log("IN API");
  console.log(user);
   console.log(gender);


   database.ref('users').child(user).update({'gender': gender});
   callback();
}
