import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getStorage } from 'firebase/storage'

const FirebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

// if a firebase instance doesn't exist, create one
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCredentials)
}

export default firebase

export const firestore = firebase.firestore()

export const auth = firebase.auth()

export const storage = getStorage(
  firebase.app(),
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL,
)
