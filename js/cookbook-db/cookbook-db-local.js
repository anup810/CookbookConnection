class CookBookDB {
    constructor() {
        this.db = null;
        this.isAvaliable = false;
    }

    open() {
        return new Promise((resolve, reject) => {
            if ('indexedBD' in window) {
                const request = indexedDB.open('Recipe', 1)

                request.onerror = (event) => {
                    reject(event.target.error.message)
                }

                request.onsuccess = (event) => {
                    const db = event.target.result
                    console.log("DB open success: ", db)
                    if (db) {
                        this.db = db;
                        this.isAvaliable = true;
                        resolve();
                    }
                    else {
                        reject("Does not open DB")
                    }
                }

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    const objectStore = db.createObjectStore('cookbook', { keyPath: 'id' });
                    console.log("Upgrade DBObject Store: ", objectStore)

                    objectStore.createIndex("title", "title")
                    objectStore.createIndex("prepTime", "prepTime")
                    objectStore.createIndex("descriptions", "descriptions")
                    objectStore.createIndex("ingredients", "ingredients")
                    objectStore.createIndex("instructions", "instructions")
                }
            } else {
                reject("Does not support IndexDB")
            }
        })
    }

    add(title, prepTime, descriptions, ingredients, instructions) {
        return new Promise((resolve, reject) => {
            if (!this.isAvaliable) {
                reject("Database not opened")
            }

            const transaction = this.db.transaction(['cookbook'], 'readwrite');
            transaction.onerror = (event) => {
                console.log("transaction error", event)
                reject(event.target.message);
            }

            transaction.oncomplete = (event) => {
                console, log("transaction done", event)
            }

            const store = transaction.objectStore('cookbook')
            const storeRequest = store.add({
                id: Date.now(),
                title: title,
                prepTime: prepTime,
                descriptions: descriptions,
                ingredients: ingredients,
                instructions: instructions
            })

            storeRequest.onerror = (event) => {
                console.log('add error', event)
                reject(event.target.message);
            }
            storeRequest.onsuccess = (event) => {
                console.log('[STORE] add success'.event)
                resolve();
            }
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            console.log("DB get all: ")

            if (!this.isAvaliable) {
                reject('Database not opened! ')
            }

            const transaction = this.db.transaction(['cookbook'], 'readonly');
            transaction.onerror = (error) => {
                reject(event.target.error.message);
            }

            const store = transaction.objectStore('cookbook')
            const request = store.getAll();

            request.onerror = (event) => {
                reject(event.target.error.message);
            }

            request.onsuccess = (event) => {
                resolve(event.target.result);
            }
        })
    }

    get(id) {
        return new Promise((resolve, reject) => {
            if (!this.isAvaliable) {
                reject('Database not opened! ')
            }

            const transaction = this.db.transaction(['cookbook'], 'readonly');
            transaction.onerror = (event) => {
                reject(event.target.error.message);
            }

            const store = transaction.objectStore('cookbook')
            const request = store.get(id);

            request.onerror = (event) => {
                reject(event.target.error.message);
            }

            request.onsuccess = (event) => {
                resolve(event.target.result);
            }
        })
    }

    update(updateRecipe) {
        return new Promise((resolve, reject) => {
            if (!this.isAvaliable) {
                reject("DB not opened!")
            }

            const transaction = this.db.transaction(['cookbook'], 'readwrite');
            transaction.onerror = (event) => {
                console.log('transaction error', event)
                reject(event.target.error.message);
            }

            const store = transaction.objectStore('cookbook')
            const storeRequest = store.put(updateRecipe)

            storeRequest.onerror = (event) => {
                console.log('Add error', event)
                reject(event.target.error.message);
            }

            storeRequest.onsuccess = (event) => {
                resolve();
            }
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            if (!this.isAvaliable) {
                reject('DB not opened! ')
            }

            const transaction = thi.db.transaction(['cookbook'], 'readwrite');
            transaction.onerror = (event) => {
                reject(event.target.error.message);
            }

            const store = transaction.objectStore('cookbook')
            const storeRequest = store.delete(id)

            storeRequest.onerror = (event) => {
                reject(event.target.error.message);
            }

            storeRequest.onsuccess = (event) => {
                resolve();
            }
        })
    }
}

export default new CookBookDB()