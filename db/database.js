const DB_NAME =
  "swimDB";

const STORE_NAME =
  "stateStore";

const DB_VERSION = 1;

// =========================
// OPEN
// =========================
export function openDatabase(){

  return new Promise((resolve,reject)=>{

    const request =
      indexedDB.open(
        DB_NAME,
        DB_VERSION
      );

    request.onupgradeneeded =
      ()=>{

        const db =
          request.result;

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
      ()=>{

        resolve(
          request.result
        );
      };

    request.onerror =
      ()=>{

        reject(
          request.error
        );
      };
  });
}

// =========================
// SAVE
// =========================
export async function saveState(state){

  const db =
    await openDatabase();

  return new Promise((resolve,reject)=>{

    const tx =
      db.transaction(
        STORE_NAME,
        "readwrite"
      );

    const store =
      tx.objectStore(
        STORE_NAME
      );

    store.put(
      state,
      "appState"
    );

    tx.oncomplete =
      ()=>resolve();

    tx.onerror =
      ()=>reject(
        tx.error
      );
  });
}

// =========================
// LOAD
// =========================
export async function loadState(){

  const db =
    await openDatabase();

  return new Promise((resolve,reject)=>{

    const tx =
      db.transaction(
        STORE_NAME,
        "readonly"
      );

    const store =
      tx.objectStore(
        STORE_NAME
      );

    const request =
      store.get(
        "appState"
      );

    request.onsuccess =
      ()=>{

        const loaded =
          request.result;

        // =========================
        // EMPTY
        // =========================
        if(!loaded){

          resolve(null);

          return;
        }

        // =========================
        // OLD STATE MIGRATION
        // capId/swimId
        // =========================
        if(
          loaded.selection?.capId !==
          undefined
        ){

          const cap =
            loaded.data?.caps?.find(
              item =>
                item.id ===
                loaded.selection.capId
            ) || null;

          const swim =
            loaded.data?.swimsuits?.find(
              item =>
                item.id ===
                loaded.selection.swimId
            ) || null;

          loaded.selection = {

            cap,

            swim
          };
        }

        resolve(
          loaded
        );
      };

    request.onerror =
      ()=>{

        reject(
          request.error
        );
      };
  });
}
