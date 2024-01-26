import { Injectable, UnauthorizedException } from "@nestjs/common";
import { response } from "express";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import axios from 'axios';




@Injectable()
export class FirebaseFuncService {
  private authFire: any;
  private db: any;
  private storage: any;

    constructor() {}


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

    // All Files in a folder
    async getDisplayNotes(uid: string, folder: string) {
        const docRef = doc(this.db, uid, folder);
        const docSnap = await getDoc(docRef);
        
        return docSnap.data();
    }

    // All folders the user has
    async getFoldersAll(uid: string) {

        const docRef = doc(this.db, uid, "folName");
        const docSnap = await getDoc(docRef);
        
        return docSnap.data();
    }

    // Cretae empty folder
    async createFolder(uid: string, folderName: string) {
        const newFolder = { notesRef : [] };

        await setDoc(doc(this.db, uid, folderName), newFolder);

        var currFol = await this.getFoldersAll(uid);
        currFol.names.push(folderName);
        await setDoc(doc(this.db, uid, "folName"), currFol);
        return true;
    }

    // Create empty file
    async createFile(uid: string, folderName: string, file: string) {
        //
        // Add file details to folder
        //
        var time = Timestamp;

        const data = {
          date: time.now(),
          folder: folderName,
          noteHead: ""
        };

        const docRef = doc(this.db, uid, folderName);
        const docSnap = await getDoc(docRef);

        var newData = docSnap.data();
        newData.notesRefMap[file] = data;

        await setDoc(doc(this.db, uid, folderName), newData);

        //
        // Create new file and add to storage
        // "def/test.txt"
        const storageRef = ref(this.storage, uid + "/" + folderName + "/" + file);
        var emptyFile = new File([""], file);

        uploadBytes(storageRef, emptyFile);
        return emptyFile;
    }

    // Get the file contents of a specific file
    async getFileInfo(uid: string, folderName: string, fileId: string) {
        const storageRef = ref(this.storage, uid + "/" + folderName + "/" + fileId);
        var url = await getDownloadURL(storageRef);
      
        const response = await axios.get(url, {responseType: 'arraybuffer'})
        return Buffer.from(response.data, 'binary');
        //return { "file" : response}
        //return await this.httpService.get(url);
    }

    // Update one specific file
    async upFileInfo(uid: string, folderName: string, fileIdCurr: string, content: string) {
        // Upload File
        const storageRef = ref(this.storage, uid + "/" + folderName + "/" + fileIdCurr);
        var currFile = new File([content], fileIdCurr);
        await uploadBytes(storageRef, currFile);

        // Update timestamp and NoteHead
        // Pending
        var time = Timestamp;
        var noteHeadCurr: string = "";
        if (content.length <= 50){
            noteHeadCurr = content;
        }
        else {
            noteHeadCurr = content.slice(0, 50);
        }

        const data = {
            date: time.now(),
            folder: folderName,
            noteHead: noteHeadCurr,
        };
        
        await this.getDisplayNotes(uid, folderName).then(
            (allFilesResp) => {
                //var allFiles = allFilesResp.notesRefMap;
                allFilesResp.notesRefMap[fileIdCurr] = data;

                setDoc(doc(this.db, uid, folderName), allFilesResp);
            }
        )

        return true;
    }

}