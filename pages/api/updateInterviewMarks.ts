import path from 'path'
import { firestore } from '../../firebase'

export const updateInterviewMarks = (
  userId: string,
  interviewerId: string,
  A: number,
  B: number,
  C: number,
  D: number,
  application_status: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`interview_marks.${interviewerId}.A`]: A,
    [`interview_marks.${interviewerId}.B`]: B,
    [`interview_marks.${interviewerId}.C`]: C,
    [`interview_marks.${interviewerId}.D`]: D,
    application_status: application_status,
  })
}
