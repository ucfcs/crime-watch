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


export function getReports (object, callback) {

 var reportList = [];
	var ref = db.ref('reports').on('value', (snapshot) => {
		snapshot.forEach(function (childSnapshot) {
			var array = Object.values(childSnapshot.val().report);
			reportList.push(...array);
		})
		callback(reportList, object);
	})
};
