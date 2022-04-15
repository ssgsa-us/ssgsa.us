import path from 'path'
import { firestore } from '../../firebase'

export const updateReviewMarks = (
  userId: string,
  reviewerId: string,
  A: number,
  B: number,
  C: number,
  D: number,
  E: number,
  application_status: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.A`]: A,
    [`review_marks.${reviewerId}.B`]: B,
    [`review_marks.${reviewerId}.C`]: C,
    [`review_marks.${reviewerId}.D`]: D,
    [`review_marks.${reviewerId}.E`]: E,
    application_status: application_status,
  })
}
