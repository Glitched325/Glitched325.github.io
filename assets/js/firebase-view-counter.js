import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getDatabase, ref, runTransaction, onValue } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js'
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js'

const firebaseConfig = {
  apiKey: "AIzaSyDCVsW3CnIgBOSJ2i4bPWwi__935Qt3oII",
  authDomain: "view-counter-4c7b6.firebaseapp.com",
  projectId: "view-counter-4c7b6",
  storageBucket: "view-counter-4c7b6.firebasestorage.app",
  messagingSenderId: "851616541404",
  appId: "1:851616541404:web:36a52822be4d6b28cc6219",
  measurementId: "G-GZ14RLHCQR",
  databaseURL: "https://view-counter-4c7b6-default-rtdb.firebaseio.com"
}

const INCREMENT_KEY = 'view_counter_last_increment'
const INCREMENT_INTERVAL_MS = 1000 * 60 * 60

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)

function shouldIncrement(){
  const last = Number(localStorage.getItem(INCREMENT_KEY) || 0)
  return Date.now() - last > INCREMENT_INTERVAL_MS
}

function markIncrement(){
  localStorage.setItem(INCREMENT_KEY, String(Date.now()))
}

function incrementViews(){
  const countRef = ref(db, 'views/count')
  runTransaction(countRef, current => (current || 0) + 1)
    .then(()=> markIncrement())
    .catch(err=> console.error('Increment error', err))
}

function attachRealtimeListener(el){
  const countRef = ref(db, 'views/count')
  onValue(countRef, snap => {
    const val = snap.val() || 0
    el.textContent = String(val)
  })
}

document.addEventListener('DOMContentLoaded',()=>{
  const el = document.getElementById('view-count')
  if(!el) return
  signInAnonymously(auth).then(cred=>{
    console.log('Signed in (anon)', cred.user.uid)
    if(shouldIncrement()) incrementViews()
    attachRealtimeListener(el)
  }).catch(err=> console.error('Auth error', err))
})
