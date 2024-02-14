import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBtcBmFiorCevQqiVdiWVo1LowTEbk0mdo",
    authDomain: "youandme-410808.firebaseapp.com",
    projectId: "youandme-410808",
    storageBucket: "youandme-410808.appspot.com",
    messagingSenderId: "93926049330",
    appId: "1:93926049330:web:fef121a7b7aeeb4179de2b",
    measurementId: "G-3NN9FPKP86",
    databaseURL: "https://youandme-410808-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// CRUD Functions
async function create(path, data) {
    try {
        const tempRef = ref(database, path);
        await push(tempRef, data);
        return true;
    } catch (error) {
        console.error('Error creating data', error);
        return false;
    }
}

async function read(path) {
    try {
        const tempRef = ref(database, path);
        const snapshot = await get(tempRef);
    
        if (snapshot.exists()) {
          const data = snapshot.val();
          return data;
        }
    
        return null;
    } catch (error) {
        console.error('Error reading data', error);
        return null;
    }
}

async function update(path, data) {
    try {
        const tempRef = ref(database, path);
        await set(tempRef, data);
        return true;
    } catch (error) {
        console.error('Error updating data', error);
        return false;
    }
}

async function remove(path) {
    try {
        const tempRef = ref(database, path);
        await set(tempRef, null);
        return true;
    } catch (error) {
        console.error('Error removing data', error);
        return false;
    }
}

export {
    create, read, update, remove
}