const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://funparty-760f2.firebaseio.com"
});

// const firebaseApp = admin.initializeApp(firebaseConfig);
const firestore = admin.firestore();

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello from firebase!");
});

app.get("/quiz", async (req, res) => {
  try {
    const docRef = firestore.collection("/users");
    const snapshot = await docRef.get();
    const data = [];
    snapshot.forEach(doc => data.push(doc.data()));
    res.send(JSON.stringify(data));

    // docRef.once("value", snap => {
    //   res.send(JSON.stringify(snap));
    // });
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

app.post("/quiz/newgame", (req, res) => {
  console.log(req.body);
  res.end(JSON.stringify(req.body));
});

app.listen(5001);

exports.app = functions.region("europe-west2").https.onRequest(app);
