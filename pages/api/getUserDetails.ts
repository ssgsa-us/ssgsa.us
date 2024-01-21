import path from 'path'
import { User, userController } from '../../classes/user'
import firebase, { firestore } from '../../firebase'
import { Users } from '../../types'

export const getUserDetailsById = async (userId: string) => {
  let user: User = await firestore
    .doc(path.join('users', userId))
    .withConverter(userController)
    .get()
    .then((user: firebase.firestore.QueryDocumentSnapshot<User>) => {
      return user.data()
    })

  return user
}

export const getUserIdByEmail = async (email: string) => {
  let userId: string | null = await firestore
    .collection('users')
    .withConverter(userController)
    .where('email', '==', email)
    .get()
    .then((users: firebase.firestore.QuerySnapshot<User>) => {
      if (users.empty) return null
      return users.docs[0].id
    })

  return userId
}

export const getUserDetailsByIds = async (userIds: Array<string>) => {
  let users: Users = await firestore
    .collection('users')
    .where(firebase.firestore.FieldPath.documentId(), 'in', userIds)
    .withConverter(userController)
    .get()
    .then((usersData: firebase.firestore.QuerySnapshot<User>) => {
      let users: Users = {}

      usersData.forEach(
        (document: firebase.firestore.QueryDocumentSnapshot<User>) => {
          users[document.id] = document.data()
        },
      )

      return users
    })

  return users
}

export const getUsersByRole = async (role: string) => {
  let users: Users = await firestore
    .collection('users')
    .where('roles', 'array-contains', role)
    .withConverter(userController)
    .get()
    .then(async (users_data: firebase.firestore.QuerySnapshot<User>) => {
      let users: Users = {}
      users_data.forEach(
        (document: firebase.firestore.QueryDocumentSnapshot<User>) => {
          users[document.id] = document.data()
        },
      )

      return users
    })

  return users
}
