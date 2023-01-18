import { firestore } from '../../firebase'

export const addReviewerInvite = (email: string, name: string) => {
  firestore.collection('reviewer_invites').doc(email).set({
    name: name,
    reminder: 0,
  })
}
