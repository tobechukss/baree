const functions = require("firebase-functions");
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const visionClient =  new vision.ImageAnnotatorClient();
admin.initializeApp();
const db = admin.firestore();


exports.Face = functions.firestore.document('photos/{document}')
.onCreate((snap, context) => {

	console.log('SNAP', snap)
	console.log('CONTEXT', context)

	const data = snap.data();
	console.log('DATA IN IS', data)
	const photoUrl = "gs://" + data.bucket + "/" + data.fullPath;
	console.log('url is', photoUrl);

	visionClient
    .labelDetection(photoUrl)
    .then(results => {
		console.log('VISION data all is: ', results)
		const labels = results[0].labelAnnotations;

        console.log('Labels:');
		let labeldesc = [];

        labels.forEach(label => {
            labeldesc.push(label.description);
        });

		console.log('labeldesc', labeldesc)

		db.collection('photos').doc(context.params.document).update({ labeldesc })
		.then(res => console.log('label added'))
		.catch(err => console.error(err));


	})
	.catch(err => console.error(err));

})

exports.issAFace = functions.firestore.document('photos/{document}')
.onCreate((snap, context) => {

	console.log('SNAP', snap)
	console.log('CONTEXT', context)

	const data = snap.data();
	console.log('DATA IN IS', data)
	const photoUrl = "gs://" + data.bucket + "/" + data.fullPath;
	console.log('url is', photoUrl);

	visionClient
    .labelDetection(photoUrl)
    .then(results => {
		console.log('VISION data all is: ', results)
		const labels = results[0].labelAnnotations;

        console.log('Labels:');
		let labeldesc = [];

        labels.forEach(label => {
            labeldesc.push(label.description);
        });

		console.log('labeldesc', labeldesc)

		db.collection('photos').doc(context.params.document).update({ labeldesc })
		.then(res => console.log('label added'))
		.catch(err => console.error(err));


	})
	.catch(err => console.error(err));

})





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
