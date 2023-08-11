// auth.js
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export function setupAuthStateListener(updateUI) {
    onAuthStateChanged(auth, (user) => {
        updateUI(user);
    });
}
