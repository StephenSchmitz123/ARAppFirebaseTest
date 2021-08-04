const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        const original = snap.data().original;
        console.log('Uppercasing', context.params.documentId, original);
        const uppercase = original.toUpperCase();
        return snap.ref.set({ uppercase }, { merge: true });
    });

exports.createUser = functions.https.onRequest( async (req, res) => {
    const data = req.query; 
    const userID = data.userID;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const jobDescription = data.jobDescription;
    const bio = data.bio;
    const methotar = data.methotar;
    
    console.log(userID);
    const docRef = await db.collection('user').doc(userID);
    await docRef.set({
        'firstName': firstName,
        'lastName': lastName,
        'jobDescription': jobDescription,
        'bio': bio,
        'methotar': methotar,
    });

    return res.send('completed');
});

exports.getUser = functions.https.onRequest( async (req, res) => {
    const userID = req.query.userID;
    const user = await db.collection('user').doc(userID).get(); 
    console.log(user.data());
    return res.send({user: user.data()});
})

