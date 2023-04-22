import path from 'path'
import { firestore } from '../../firebase'

export const step1 = (
  userId: string,
  interviewerId: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`interview_marks.${interviewerId}.formStatus`]: formStatus,
  })
}
