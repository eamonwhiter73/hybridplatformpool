const admin = require('../node_modules/firebase-admin');
const firebase = require('../node_modules/firebase');
const serviceAccount = require("./service-key.json");

const data = require("./data.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pool-3f2de.firebaseio.com"
});

//data && Object.keys(data).forEach(key => {
const array = data["pools"]["Poolool"]["items"]["items_array"]["array"];

var date = new Date().getTime();

for(var objj of array) {

    var obj = JSON.parse(JSON.stringify({date: date.toString(), 
                                                 downloadURL: objj.downloadURL,
                                                 item: objj.item,
                                                 description: objj.description,
                                                 active: true}));
    admin.firestore()
        .collection("pools")
        .doc("Poolool")
        .collection("items")
        .doc("items_array")
        .update({array: admin.firestore.FieldValue.arrayUnion(obj)})
        .then((res) => {
            console.log("Document successfully written!", res);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        })
}
