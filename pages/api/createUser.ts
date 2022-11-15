import path from 'path'
import { firestore } from '../../firebase'
import { User } from '../../types'

export const createUser = (
  userUID: string,
  name: string,
  email: string,
  mobile: Number,
  role: string = 'applicant',
  sets: Array<string> = [],
) => {
  const user: User = {
    name,
    email,
    mobile,
    role,
    sets,
  }

  firestore.doc(path.join('users', userUID)).set(user)
}
