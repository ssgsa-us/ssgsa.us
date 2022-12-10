import path from 'path'
import firebase, { firestore } from '../../firebase'
import { User, userController } from '../../classes/user'

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
