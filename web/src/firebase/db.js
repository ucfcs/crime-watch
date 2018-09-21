import { db } from './firebase';

// The user API created as an object with username and email properties
// stored on users/${id} path. 

export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({
    username,
    email,
  });
  
export const onceGetUsers = () =>
	db.ref('users').once('value');