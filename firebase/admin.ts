import admin from 'firebase-admin'

if (!process.browser)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    })
  }

export const firebaseAdmin = admin

export const adminAuth = admin.auth()

export const adminFirestore = admin.firestore()
