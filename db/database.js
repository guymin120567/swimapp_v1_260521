const DB_NAME = "swim_app_db";

const STORE = "stateStore";

const KEY = "main";

let db = null;

// =========================
// DB OPEN
// =========================
function openDB() {

  return new Promise((resolve, reject) => {

    const request =
      indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (e) => {

      const db = e.target.result;

      if (
        !db.objectStoreNames.contains(STORE)
      ) {
        db.createObjectStore(STORE);
      }
    };

    request.onsuccess = () => {

      db = request.result;

      console.log("DB OPEN SUCCESS");

      resolve(db);
    };

    request.onerror = () => {

      console.error(
        "DB OPEN ERROR",
        request.error
      );

      reject(request.error);
    };
  });
}

// =========================
// SAVE
// =========================
export async function saveDB(state) {

  if (!db) {
    await openDB();
  }

  return new Promise((resolve, reject) => {

    const tx =
      db.transaction(STORE, "readwrite");

    const store =
      tx.objectStore(STORE);

    const req =
      store.put(state, KEY);

    req.onsuccess = () => {

      console.log("DB SAVED");

      resolve(true);
    };

    req.onerror = () => {

      console.error(
        "DB SAVE ERROR",
        req.error
      );

      reject(req.error);
    };
  });
}

// =========================
// LOAD
// =========================
export async function loadDB() {

  if (!db) {
    await openDB();
  }

  return new Promise((resolve, reject) => {

    const tx =
      db.transaction(STORE, "readonly");

    const store =
      tx.objectStore(STORE);

    const req =
      store.get(KEY);

    req.onsuccess = () => {

      console.log(
        "DB LOADED",
        req.result
      );

      resolve(req.result || null);
    };

    req.onerror = () => {

      console.error(
        "DB LOAD ERROR",
        req.error
      );

      reject(req.error);
    };
  });
}

// =========================
// CLEAR
// =========================
export async function clearDB() {

  if (!db) {
    await openDB();
  }

  return new Promise((resolve, reject) => {

    const tx =
      db.transaction(STORE, "readwrite");

    const store =
      tx.objectStore(STORE);

    const req =
      store.delete(KEY);

    req.onsuccess = () => {

      console.log("DB CLEARED");

      resolve(true);
    };

    req.onerror = () => {

      console.error(
        "DB CLEAR ERROR",
        req.error
      );

      reject(req.error);
    };
  });
}
