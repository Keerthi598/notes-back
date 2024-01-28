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

    //All the files in teh favorite folder
    async getFavAll(uid: string) {
        const docRef = doc(this.db, uid, "favorites");
        const docSnap = await getDoc(docRef);
        
        return docSnap.data();
    }

    async getDashFiles(uid: string) {
        const docRef = doc(this.db, uid, "DashBoard");
        const docSnap = await getDoc(docRef);

        return docSnap.data();
    }

    // Cretae empty folder
    async createFolder(uid: string, folderName: string) {
        const newFolder = { notesRefMap : {} };

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
          noteHead: "",
          favorite: false,
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
        return await Buffer.from(response.data, 'binary');
    }

    async getFileMetaData(uid: string, folderName: string, fileId: string) {
        var allFiles = await this.getDisplayNotes(uid, folderName);

        return await allFiles.notesRefMap[fileId];
    }

    // Update one specific file
    async upFileInfo(uid: string, folderName: string, fileIdCurr: string, content: string, fav: boolean) {
        // Upload File
        const storageRef = ref(this.storage, uid + "/" + folderName + "/" + fileIdCurr);
        var currFile = new File([content], fileIdCurr);
        await uploadBytes(storageRef, currFile);

        if (fav) {
            this.toggleIsFavorite(uid, folderName, fileIdCurr, content);
            return true;
        }

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

        noteHeadCurr += "...";

        const data = {
            date: time.now(),
            folder: folderName,
            noteHead: noteHeadCurr,
            favorite: false,
        };

        
        await this.getDisplayNotes(uid, folderName).then(
            (allFilesResp) => {
                allFilesResp.notesRefMap[fileIdCurr] = data;

                setDoc(doc(this.db, uid, folderName), allFilesResp);
            }
        )

        await this.UpdateDash(uid, fileIdCurr, data);

        return true;
    }



    async toggleIsFavorite(uid: string, folderName: string, fileIdCurr: string, content: string) {
        var time = Timestamp;
        var noteHeadCurr: string = "";
        if (content.length <= 50){
            noteHeadCurr = content;
        }
        else {
            noteHeadCurr = content.slice(0, 50);
        }
        noteHeadCurr += "...";

        const data = {
            date: time.now(),
            folder: folderName,
            noteHead: noteHeadCurr,
            favorite: true,
        }
        
        await this.getDisplayNotes(uid, folderName).then(
            (allFilesResp) => {
                allFilesResp.notesRefMap[fileIdCurr] = data;

                setDoc(doc(this.db, uid, folderName), allFilesResp);
            }
        )

        await this.getDisplayNotes(uid, "favorites").then(
            (favFilesResp) => {
                favFilesResp.favFileMap[fileIdCurr] = data;

                setDoc(doc(this.db, uid, "favorites"), favFilesResp);
            }
        )

        await this.UpdateDash(uid, fileIdCurr, data);

        return true;
    }

    


    async UpdateDash(uid: string, fileIdCurr: string, data) {
        var currDashResp = await this.getDashFiles(uid);
        var currDash = await currDashResp.dashRef;

        const newData = {
            fileId: fileIdCurr,
            content: data,
        }

        var match = -1
        // Max items in dashboard is 10
        for(let i = 0; i < currDash.length && i < 10; i++) {
            if (currDash[i].fileId == fileIdCurr){
                match = i;
                break;
            }
        }

        // If file is not in dashboard
        if (match == -1) {
            for(let i = currDash.length - 1; i >= 0; i--) {
                currDash[i + 1] = currDash[i];
            }
        }

        // If file is not the first file in the dashboard
        else if(match > 0) {
            for(let i = match - 1; i >= 0; i--) {
                currDash[i + 1] = currDash[i];
            }
        }

        currDash[0] = newData;
        currDashResp.dashRef = currDash;
        await setDoc(doc(this.db, uid, "DashBoard"), currDashResp);
        return;

    }

}