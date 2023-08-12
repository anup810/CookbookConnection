//API for using cloud or local (Background SYNC)
import dbOnline from './cookbook-db-cloud.js';
import dbOffline from './cookbook-db-local.js';

class CookBookDB {
    constructor() {
        console.log('Online DB', dbOnline)
        console.log('Offline DB', dbOffline)
        this.dbOnline = dbOnline;
        this.dbOffline = dbOffline;
        this.swController = null;
        this.swRegistration = null;
    }

    open() {
        console.log("CookBook DB opened")
        return new Promise((resolve, reject) => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then((registration) => {
                    if ('active' in registration && 'sync' in registration) {
                        this.dbOffline.open()
                            .then(() => {
                                this.swController = registration.active;
                                this.swRegistration = registration;
                                this.dbOnline.open().then(resolve).catch(reject);
                            })
                            .catch(() => {
                                this.dbOnline.open().then(resolve).catch(reject);
                            });
                    } else {
                        this.dbOnline.open().then(resolve).catch(reject);
                    };
                });
            } else {
                this.dbOnline.open().then(resolve).catch(reject);
            }
        })
    }

    add(title, prepTime, descriptions, ingredients, instructions) {
        if (navigator.onLine) {
            return this.dbOnline.add(title, prepTime, descriptions, ingredients, instructions);
        } else {
            this.swRegistration.sync.getTags()
                .then((tags) => {
                    if (!tags.includes('add-recipe')) {
                        this.swRegistration.sync.register('add-recipe')
                    }
                })
            return this.dbOffline.add(title, prepTime, descriptions, ingredients, instructions);
        }
    }

    getAll() {
        if (navigator.onLine) {
            return this.dbOnline.getAll();
        } else {
            return new Promise((resolve, reject) => {
                reject('You must be connected to web')
            })
        }
    }

    get(id) {
        if (navigator.onLine) {
            return this.dbOnline.get(id);
        } else {
            return new Promise((resolve, reject) => {
                reject('You must be connected to web')
            })
        }
    }

    update(updateRecipe) {
        if (navogator.onLine) {
            return this.dbOnline.update(updateRecipe);
        } else {
            return new Promise((resolve, reject) => {
                reject('You must be connected to web')
            })
        }
    }

    delete(id){
        if(navigator.onLine){
            return this.dbOnline.delete(id);
        } else {
            return new Promise((resolve, reject) => {
                reject("You must be connected to web")
            })
        }
    }
}

export default new CookBookDB();