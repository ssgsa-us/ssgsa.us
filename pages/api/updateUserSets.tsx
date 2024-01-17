import path from 'path'
import { firestore } from '../../firebase'

export const updateReviewSets = (userId: string, sets: Array<string>) => {
  return firestore.doc(path.join('users', userId)).update({ review_sets: sets })
}

export const updateInterviewSets = (userId: string, sets: Array<string>) => {
  return firestore
    .doc(path.join('users', userId))
    .update({ interview_sets: sets })
}
