import path from 'path'
import { firestore } from '../../firebase'
import { User } from '../../types'

export const createUser = (
  userUID: string,
  name: string,
  email: string,
  mobile: Number,
) => {
  const user: User = {
    name,
    email,
    mobile,
  }

  firestore.doc(path.join('users', userUID)).set(user)
}
