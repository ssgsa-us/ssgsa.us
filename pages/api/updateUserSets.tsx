import path from 'path'
import { firestore } from '../../firebase'

export const updateUserSets = (userId: string, sets: Array<string>) => {
  return firestore.doc(path.join('users', userId)).update({ sets })
}
