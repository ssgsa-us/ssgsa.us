import path from 'path'
import { firestore } from '../../firebase'

export const updateInterviewSet = (userId: string, set: string) => {
  return firestore
    .doc(path.join('admin_portal_data', userId))
    .update({ interview_set: set })
}
