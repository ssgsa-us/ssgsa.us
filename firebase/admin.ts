import admin from 'firebase-admin'
import serviceAccount from '../serviceAccountKey.json'

if (!process.browser)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }

export const firebaseAdmin = admin

export const adminAuth = admin.auth()

export const adminFirestore = admin.firestore()
