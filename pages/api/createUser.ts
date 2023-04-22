import path from 'path'
import { User, userController } from '../../classes/user'
import Roles from '../../constants/roles'
import { firestore } from '../../firebase'

export const createUser = (
  userUID: string,
  name: string,
  email: string,
  mobile: Number,
  verificationEmailEpoch: number,
  role: string = Roles.APPLICANT,
  sets: Array<string> = [],
) => {
  const user: User = new User(
    name,
    email,
    mobile,
    role,
    sets,
    verificationEmailEpoch,
  )

  firestore
    .doc(path.join('users', userUID))
    .withConverter(userController)
    .set(user)
}

export const updateUserRole = (userId: string, role: string) => {
  firestore.doc(path.join('users', userId)).update({ role })
}
