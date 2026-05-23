const DB_NAME =
  "swimRouletteDB";

const DB_VERSION = 3;

const STATE_STORE =
  "stateStore";

const STATE_KEY =
  "main_state";

let dbInstance = null;

// =========================
// OPEN DB
// =========================
async function openDB(){

  if(dbInstance){

    return dbInstance;
  }

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
              STATE_STORE
            )
          ){

            db.createObjectStore(
              STATE_STORE
            );
          }

          if(
            db.objectStoreNames.contains(
              "appState"
            )
          ){

            db.deleteObjectStore(
              "appState"
            );
          }

          if(
            db.objectStoreNames.contains(
              "imageStore"
            )
          ){

            db.deleteObjectStore(
              "imageStore"
            );
          }
        };

      request.onsuccess =
        ()=>{

          dbInstance =
            request.result;

          resolve(
            dbInstance
          );
        };

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
export async function saveState(state){

  const db =
    await openDB();

  return new Promise(
    (resolve,reject)=>{

      const tx =
        db.transaction(
          STATE_STORE,
          "readwrite"
        );

      const store =
        tx.objectStore(
          STATE_STORE
        );

      const request =
        store.put(
          state,
          STATE_KEY
        );

      request.onsuccess =
        ()=>resolve(true);

      request.onerror =
        ()=>reject(
          request.error
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

      const tx =
        db.transaction(
          STATE_STORE,
          "readonly"
        );

      const store =
        tx.objectStore(
          STATE_STORE
        );

      const request =
        store.get(
          STATE_KEY
        );

      request.onsuccess =
        ()=>resolve(
          request.result || null
        );

      request.onerror =
        ()=>reject(
          request.error
        );
    }
  );
}

// =========================
// RESET (DEV ONLY)
// =========================
export function resetDatabase() {
  return new Promise((resolve, reject) => {

    // 1. 강제로 연결 끊기
    dbInstance = null;

    const request = indexedDB.deleteDatabase("swimRouletteDB");

    request.onsuccess = () => {
      console.log("DB RESET SUCCESS");
      resolve();
    };

    request.onerror = () => {
      console.error("DB RESET FAIL");
      reject(request.error);
    };

    request.onblocked = () => {
      console.warn("DB RESET BLOCKED (close tabs / refresh app)");
    };
  });
}
