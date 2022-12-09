import { useState, useEffect } from 'react'
import firebase, { auth } from './index'
import { AuthUser } from '../types'
import { getUserDetailsById } from '../pages/api/getUserDetails'
import { User } from '../classes/user'

const formatAuthUser = (id: string, user: User) => ({
  id: id,
  email: user.email,
  role: user.role,
  sets: user.sets,
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUser>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Runs everytime when auth state changes
  // Runs after signin/signup and at every reload
  // Fetch user details and update it in authUser
  const authStateChanged = async (authState: firebase.User) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    getUserDetailsById(authState.uid)
      .then((user) => {
        if (!user) return

        let formattedUser: AuthUser = formatAuthUser(authState.uid, user)
        setAuthUser(formattedUser)
      })
      .catch(() => {}) //Left to decide what to do when details are not fetched
      .finally(() => setLoading(false))
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
