const DB_NAME =
  "swimRouletteDB";

const STORE_NAME =
  "appState";

const DB_VERSION = 1;

// =========================
// OPEN DB
// =========================
function openDB(){

  return new Promise(
    (resolve,reject)=>{

      const request =
        indexedDB.open(
          DB_NAME,
          DB_VERSION
        );

      request.onupgradeneeded =
        event=>{

          const db =
            event.target.result;

          if(
            !db.objectStoreNames.contains(
              STORE_NAME
            )
          ){

            db.createObjectStore(
              STORE_NAME
            );
          }
        };

      request.onsuccess =
        ()=>resolve(
          request.result
        );

      request.onerror =
        ()=>reject(
          request.error
        );
    }
  );
}

// =========================
// SAVE STATE
// =========================
export async function saveState(
  state
){

  const db =
    await openDB();

  return new Promise(
    (resolve,reject)=>{

      const transaction =
        db.transaction(
          STORE_NAME,
          "readwrite"
        );

      const store =
        transaction.objectStore(
          STORE_NAME
        );

      store.put(
        state,
        "main"
      );

      transaction.oncomplete =
        ()=>resolve();

      transaction.onerror =
        ()=>reject(
          transaction.error
        );
    }
  );
}

// =========================
// LOAD STATE
// =========================
export async function loadState(){

  const db =
    await openDB();

  return new Promise(
    (resolve,reject)=>{

      const transaction =
        db.transaction(
          STORE_NAME,
          "readonly"
        );

      const store =
        transaction.objectStore(
          STORE_NAME
        );

      const request =
        store.get("main");

      request.onsuccess =
        ()=>resolve(
          request.result
        );

      request.onerror =
        ()=>reject(
          request.error
        );
    }
  );
}
