const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.createMethotar = functions.https.onRequest( async (req, res) => {
    const data = req.query; 
    const userID = data.userID;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const jobDescription = data.jobDescription;
    const bio = data.bio;
    
    console.log(userID);
    const docRef = await db.collection('methotar').doc(userID);
    await docRef.set({
        'firstName': firstName,
        'lastName': lastName,
        'jobDescription': jobDescription,
        'bio': bio,
    });

    return res.send('completed');
});

exports.getMethotar = functions.https.onRequest( async (req, res) => {
    const userID = req.query.userID;
    const user = await db.collection('methotar').doc(userID).get(); 
    console.log(user.data());
    return res.send({user: user.data()});
});

exports.getFunFacts = functions.https.onRequest( async (req, res) => {
    return res.json('hello fun facts');
});

exports.getPastProjects = functions.https.onRequest( async (req, res) => {
    return res.json('hello past project');
});

exports.getLeaderboard = functions.https.onRequest( async (req, res) => {
    return res.json('hello leaderboard');
});