/**
 * CookBookDB API using database
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, addDoc, collection, doc, getDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

class CookBookDB {
    constructor() {
        this.db = null;
        this.isAvailable = false;
    }

    open() {
        return new Promise((resolve, reject) => {
            try {
                const firebaseConfig = {
                    apiKey: "AIzaSyDkLIgwVKpqdOpuhF1-26RsKaRQmjMWtaw",
                    authDomain: "map-pwa-ca20f.firebaseapp.com",
                    databaseURL: "https://map-pwa-ca20f-default-rtdb.firebaseio.com",
                    projectId: "map-pwa-ca20f",
                    storageBucket: "map-pwa-ca20f.appspot.com",
                    messagingSenderId: "134536483378",
                    appId: "1:134536483378:web:1eb239d2da1ce7fb35222b",
                    measurementId: "G-PMZXDZ5N71"
                  };

                // Initialize Firebase
                const app = initializeApp(firebaseConfig);

                // Initialize Cloud Firestore and get a reference to the service
                const db = getFirestore(app);
                if (db) {
                    this.db = db;
                    this.isAvailable = true;
                    resolve();
                }
                else {
                    reject("This Db has an error")
                }
            }
            catch (error) {
                reject(error.message)
            }
        })
    }

    add(title, prepTime, description, ingredients, instructions){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject('Database not opened! ')
            }

            const addForm = {
                title: title,
                prepTime: prepTime,
                description: description,
                ingredients: ingredients,
                instructions: instructions
            }

            const dbCollection = collection(this.db, 'cookbook')

            addDoc(dbCollection, addForm)
            .then((docRef) => {
                resolve();
            })
            .catch((error) => {
                reject(error.message)
            })
        })
    }

    getAll(){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject('Database not opened! ')
            }

            const dbCollection = collection(this.db, 'cookbook')

            getDocs(dbCollection)
            .then((recipeSnapshot) => {
                const result = []

                recipeSnapshot.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id
                    result.push(data)
                })
                resolve(result)
            })
            .catch((error) => {
                reject(error.message)
            })
        })
    }

    get(id){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject('Database not opened! ')
            }

            const docRef = doc(this.db, 'cookbook', id)

            getDoc(docRef)
            .then((docSnap) => {
                const data = docSnap.data()
                data.id = id
                resolve(data)
            })
            .catch((error) => {
                reject(error.message)
            })
        })
    }

    update(updateRecipe){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject('Database not opened! ')
            }

            const docRef = doc(this.db, 'cookbook', updateRecipe.id)

            updateDoc(docRef, {
                title: updateRecipe.title,
                prepTime: updateRecipe.prepTime,
                description: updateRecipe.description,
                ingredients: updateRecipe.ingredients,
                instructions: updateRecipe.instructions
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error.message)
            })
        })
    }

    delete(id){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject('Database not opened! ')
            }

            const docRef = doc(this.db, 'cookbook', id)

            deleteDoc(docRef)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error.message)
            })
        })
    }
}

export default new CookBookDB();