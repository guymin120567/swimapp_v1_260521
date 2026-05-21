const DB_NAME = "swim_app_db";
const DB_VERSION = 2;

const STATE_STORE = "stateStore";
const IMAGE_STORE = "imageStore";

const STATE_KEY = "main_state";

let dbInstance = null;

// =========================
// OPEN DB
// =========================
async function openDB(){

  if(dbInstance){
    return dbInstance;
  }

  return new Promise((resolve,reject)=>{

    const request = indexedDB.open(
      DB_NAME,
      DB_VERSION
    );

    request.onupgradeneeded = (event)=>{

      const db = event.target.result;

      // STATE STORE
      if(!db.objectStoreNames.contains(STATE_STORE)){
        db.createObjectStore(STATE_STORE);
      }

      // IMAGE STORE
      if(!db.objectStoreNames.contains(IMAGE_STORE)){
        db.createObjectStore(IMAGE_STORE);
      }
    };

    request.onsuccess = ()=>{

      dbInstance = request.result;

      resolve(dbInstance);
    };

    request.onerror = ()=>{
      reject(request.error);
    };
  });
}

// =========================
// SAVE STATE
// =========================
export async function saveState(state){

  const db = await openDB();

  return new Promise((resolve,reject)=>{

    const tx = db.transaction(
      STATE_STORE,
      "readwrite"
    );

    const store = tx.objectStore(
      STATE_STORE
    );

    const request = store.put(
      state,
      STATE_KEY
    );

    request.onsuccess = ()=>{
      resolve(true);
    };

    request.onerror = ()=>{
      reject(request.error);
    };
  });
}

// =========================
// LOAD STATE
// =========================
export async function loadState(){

  const db = await openDB();

  return new Promise((resolve,reject)=>{

    const tx = db.transaction(
      STATE_STORE,
      "readonly"
    );

    const store = tx.objectStore(
      STATE_STORE
    );

    const request = store.get(
      STATE_KEY
    );

    request.onsuccess = ()=>{
      resolve(request.result || null);
    };

    request.onerror = ()=>{
      reject(request.error);
    };
  });
}

// =========================
// SAVE IMAGE
// =========================
export async function saveImage(
  imageId,
  imageData
){

  const db = await openDB();

  return new Promise((resolve,reject)=>{

    const tx = db.transaction(
      IMAGE_STORE,
      "readwrite"
    );

    const store = tx.objectStore(
      IMAGE_STORE
    );

    const request = store.put(
      imageData,
      imageId
    );

    request.onsuccess = ()=>{
      resolve(true);
    };

    request.onerror = ()=>{
      reject(request.error);
    };
  });
}

// =========================
// LOAD IMAGE
// =========================
export async function loadImage(
  imageId
){

  const db = await openDB();

  return new Promise((resolve,reject)=>{

    const tx = db.transaction(
      IMAGE_STORE,
      "readonly"
    );

    const store = tx.objectStore(
      IMAGE_STORE
    );

    const request = store.get(
      imageId
    );

    request.onsuccess = ()=>{
      resolve(request.result || null);
    };

    request.onerror = ()=>{
      reject(request.error);
    };
  });
}

// =========================
// DELETE IMAGE
// =========================
export async function deleteImage(
  imageId
){

  const db = await openDB();

  return new Promise((resolve,reject)=>{

    const tx = db.transaction(
      IMAGE_STORE,
      "readwrite"
    );

    const store = tx.objectStore(
      IMAGE_STORE
    );

    const request = store.delete(
      imageId
    );

    request.onsuccess = ()=>{
      resolve(true);
    };

    request.onerror = ()=>{
      reject(request.error);
    };
  });
}
