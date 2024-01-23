import { Injectable, UnauthorizedException } from "@nestjs/common";
import { response } from "express";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Timestamp } from "firebase/firestore";



@Injectable()
export class FirebaseFuncService {
  private authFire: any;
  private db: any;
  private storage: any;


    initialize() {
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

        this.authFire = getAuth(app);
        this.db = getFirestore();
        this.storage = getStorage();

        return this;
    }

    async auth(email: string, pass: string) {
        return signInWithEmailAndPassword(this.authFire, email, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          return user.uid;
        })

        .catch((error) => {
          // Login failed
          const errorCode = error.code;
          const errorMessage = error.message;
          throw new UnauthorizedException();
        });
    }

    async getDisplayNotes(uid: string, folder: string) {
        const docRef = doc(this.db, uid, folder);
        const docSnap = await getDoc(docRef);
        
        return docSnap.data();
    }

    async getFoldersAll(uid: string) {

        const docRef = doc(this.db, uid, "folName");
        const docSnap = await getDoc(docRef);
        
        return docSnap.data();
    }

    async createFolder(uid: string, folderName: string) {
        const newFolder = { notesRef : [] };

        await setDoc(doc(this.db, uid, folderName), newFolder);

        var currFol = await this.getFoldersAll(uid);
        currFol.names.push(folderName);
        await setDoc(doc(this.db, uid, "folName"), currFol);
        return true;
    }

    async createFile(uid: string, folderName: string, file: string) {
        //
        // Add file details to folder
        //
        var time = Timestamp;

        const data = {
          date: time.now(),
          fileId: file,
          folder: folderName,
          noteHead: ""
        };

        const docRef = doc(this.db, uid, folderName);
        const docSnap = await getDoc(docRef);

        var newData = docSnap.data();
        newData.notesRef.push(data);

        await setDoc(doc(this.db, uid, folderName), newData);

        //
        // Create new file and add to storage
        // "def/test.txt"
        const storageRef = ref(this.storage, uid + "/" + folderName + "/" + file);
        var emptyFile = new File([""], file);

        uploadBytes(storageRef, emptyFile);
        // .then((snapshot) => {
        //   console.log('Uploaded a blob or file!');
        // });
        return emptyFile;
    }



    async initializeFirebase() {
        // const firebaseConfig = {
        //   apiKey: "AIzaSyDPPrLPrZBjsggYEGos2PPBJwkw_mjN0ck",
        //   authDomain: "notes-a7479.firebaseapp.com",
        //   projectId: "notes-a7479",
        //   storageBucket: "notes-a7479.appspot.com",
        //   messagingSenderId: "946934545824",
        //   appId: "1:946934545824:web:86a106b633ca6ce069f8c5",
        //   measurementId: "G-W8WDYYCDPY"
        // };    
        
        // const app = initializeApp(firebaseConfig);
        
        // const auth = getAuth(app);
        // const email = "zekrom598@gmail.com";
        // const pass = "default";
        // var uid = "";

        // signInWithEmailAndPassword(auth, email, pass)
        // .then((userCredential) => {
        //   // Signed in 
        //   const user = userCredential.user;
        //   uid = user.uid;
        //   console.log("Signed In");
        //   // ...
        // })

        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   console.log("Id/Password incorrect");
        // });

        // const db = getFirestore();
        // const data = {
        //   names: ["Default"]
        // };
        // const fol = {
        //   notesRef: []
        // }

        // const storage = getStorage();

        //const storageRef = ref(storage, "def/test.txt");
        //var file = new File([""], "test.txt");

        // async function doStuff(){
        //   if (uid == "")
        //   {
        //     setTimeout(doStuff, 50);//wait 50 millisecnds then recheck
        //     return;
        //   }

        //   // await setDoc(doc(db, uid, "folName"), data);
        //   // await setDoc(doc(db, uid, "Default"), fol);
        //   // uploadBytes(storageRef, file).then((snapshot) => {
        //   //   console.log('Uploaded a blob or file!');
        //   // });
        // }

        //doStuff();
        //return db;
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

        return this;
    }
}