const DB_NAME =
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
