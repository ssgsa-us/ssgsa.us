import path from 'path'
import { firestore } from '../../firebase'

export const updateReviewRemark = (
  userId: string,
  reviewerId: string,
  remark: string,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.remark`]: remark,
  })
}
