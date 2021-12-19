import { useState, useEffect } from 'react'
import firebase, { auth } from './index'
import { AuthUser } from '../types'

const formatAuthUser = (user: firebase.User) => ({
  id: user.uid,
  email: user.email,
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUser>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const authStateChanged = async (authState: firebase.User) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const signInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password)

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password)

  const signOut = () =>
    auth.signOut().then(() => {
      setAuthUser(null)
      setLoading(true)
    })

  // listen for firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  }
}
