import { Injectable } from "@nestjs/common";
// import { firestore, initializeApp } from "firebase-admin";
// import { applicationDefault, cert } from "firebase-admin/app";
// import { getFirestore, Timestamp, FieldValue, Filter } from "firebase-admin/firestore";
// import { getStorage } from "firebase-admin/storage";
// import { getAuth, EmailSignInProviderConfig } from "firebase-admin/auth"
//import admin from 'firebase-admin';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";


@Injectable()
export class FirebaseFuncService {
    async initializeFirebase() {
        // const admin = require("firebase-admin");
        // const serviceAccount = require('../../NotesFireBaseLog.json'); 
        // Initialize Firebase
        //const app = admin.initializeApp(firebaseConfig);  
        // admin.initializeApp({credential: cert(serviceAccount),
        //      databaseURL: 'https:/notes-a7479.firebaseio.com',
        //      storageBucket: 'gs://notes-a7479.appspot.com'
        //     });
      
        // const db = getFirestore();
        //const storage = getStorage();
        //console.log(storage);
        //const x = admin.storage().bucket();
        //x.upload('nest-cli.json');
        //console.log(x);
        //const storageRef = admin.ref(storage);

        const firebaseConfig = {
          apiKey: "AIzaSyDPPrLPrZBjsggYEGos2PPBJwkw_mjN0ck",
          authDomain: "notes-a7479.firebaseapp.com",
          projectId: "notes-a7479",
          storageBucket: "notes-a7479.appspot.com",
          messagingSenderId: "946934545824",
          appId: "1:946934545824:web:86a106b633ca6ce069f8c5",
          measurementId: "G-W8WDYYCDPY"
        };    
        
        const app = initializeApp(firebaseConfig);
        
        const auth = getAuth(app);
        const email = "zekrom598@gmail.com";
        const pass = "default";
        var uid = "";

        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          uid = user.uid;
          // ...
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Id/Password incorrect");
        });

        const db = getFirestore();
        // const data = {
        //   name: 'Los Angeles',
        //   state: 'CA',
        //   country: 'USA '
        // };

        const storage = getStorage();

        // const storageRef = ref(storage, "def/test.txt");
        // var file = new File([""], "test.txt");

        async function doStuff(){
          if (uid == "")
          {
            setTimeout(doStuff, 50);//wait 50 millisecnds then recheck
            return;
          }

          //await setDoc(doc(db, uid, "LA"), data);
          // uploadBytes(storageRef, file).then((snapshot) => {
          //   console.log('Uploaded a blob or file!');
          // });
        }

        doStuff();
        return db;
    }

    async getData(db) { 

        // const snapshot = (await db).collection('notes').get();
        // (await snapshot).forEach((doc) => {
        //     console.log(doc.id, '=>', doc.data());
        //   });
        // Works
        // const data = {
        //   name: 'Los Angeles',
        //   state: 'CA',
        //   country: 'USA'
        // };
        // Add a new document in collection "cities" with ID 'LA'
        //const res = (await db).collection('cities').doc('LA').set(data);


    }
}