import path from 'path'
import firebase, { firestore } from '../../firebase'

export const addReviewerInvite = (email: string, name: string) => {
  firestore.collection('reviewer_invites').doc(email).set({
    name: name,
    reminder: 0,
  })
}

export const getReviewerInvite = async (email: string) => {
  let reviewerInvite: firebase.firestore.DocumentData = await firestore
    .doc(path.join('reviewer_invites', email))
    .get()
    .then(
      (
        invite: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
      ) => {
        return invite.data()
      },
    )

  return reviewerInvite
}

export const updateReviewerResponse = (email: string, response: string) => {
  return firestore
    .collection('reviewer_invites')
    .doc(email)
    .update({ response })
}
