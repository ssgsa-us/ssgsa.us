import path from 'path'
import { firestore } from '../../firebase'
import { User } from '../../types'

export const createUser = (
  userUID: string,
  name: string,
  email: string,
  stream: string,
  gender: string,
  dob: string,
  mobile: Number,
  pwd: string,
) => {
  const user: User = {
    name,
    email,
    stream,
    gender,
    dob,
    mobile,
    pwd,
  }

  firestore.doc(path.join('users', userUID)).set(user)
}
