import path from 'path'
import { firestore } from '../../firebase'

export const updateReviewSet = (userId: string, set: string) => {
  return firestore
    .doc(path.join('admin_portal_data', userId))
    .update({ review_set: set })
}
