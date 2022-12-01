import path from 'path'
import { User, userController } from '../../classes/user'
import Roles from '../../constants/roles'
import { firestore } from '../../firebase'

export const createUser = (
  userUID: string,
  name: string,
  email: string,
  mobile: Number,
  role: string = Roles.APPLICANT,
  sets: Array<string> = [],
) => {
  const user: User = new User(name, email, mobile, role, sets)

  firestore
    .doc(path.join('users', userUID))
    .withConverter(userController)
    .set(user)
}
