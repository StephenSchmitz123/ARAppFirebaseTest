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

exports.createPastProjects = functions.https.onRequest( async (req, res) => {
    const data = req.query; 
    const clientID = data.client.id
    const dateStarted = data.dateStarted;
    const dateEnded = data.dateEnded;
    const description = data.description;
    
    const teamRef = db.collection("team");
    const team = data.team

    const docRef = await db.collection('pastprojects').doc(userID);
    await docRef.set({
        'clientID': clientID,
        'dateStarted': dateStarted,
        'dateEnded': dateEnded,
        'description': description,
    });

    for(member in team){
        docRef.teamRef.doc(member.id).set({
            'fName': member.firstName,
            'lName': member.lastName,
            'jobDescription': member.jobDescripiton,
            'bio': member.bio
        })
    }

    return res.send('completed');
});

exports.createFunFacts = functions.https.onRequest( async (req, res) => {
    const data = req.query; 
    const title = data.title;
    const description = data.description;

    const docRef = await db.collection('funfacts').doc(userID);
    
    await docRef.set({
        'title': title,
        'description': description,
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
    const userID = req.query.userID;

    const user = await db.collection('funfacts').doc(userID).get(); 
    console.log(user.data());
    return res.send({
        title: user.data().title,
        description: user.data().description,
    });
});

exports.getPastProjects = functions.https.onRequest( async (req, res) => {
    const userID = req.query.userID;
    
    const user = await db.collection('pastproject').doc(userID).get(); 
    console.log(user.data());
    
    return res.send({
        clientID: user.data().clientID,
        dateStartedtID: user.data().dateStarted,
        dateEnded: user.data().dateEnded,
        description: user.data().description,
        team: user.data().team,
    });
});

exports.getLeaderboard = functions.https.onRequest( async (req, res) => {
    return res.send('completed');
});
