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

export const getUserDetailsByIds = async (userIds: Array<string>) => {
  let users: Users = {}

  userIds.map((userId: string) => {
    getUserDetailsById(userId)
      .then((user: User) => (users[userId] = user))
      .catch(() => {})
  })

  return users
}

export const getUsersByRole = async (role: string) => {
  let users: Users = await firestore
    .collection('users')
    .where('role', '==', role)
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
