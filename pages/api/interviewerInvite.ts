import path from 'path'
import firebase, { firestore } from '../../firebase'

export const getInterviewerInvite = async (email: string) => {
  let interviewerInvite: firebase.firestore.DocumentData = await firestore
    .doc(path.join('interviewer_invites', email))
    .get()
    .then(
      (
        invite: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
      ) => {
        return invite.data()
      },
    )

  return interviewerInvite
}

export const updateInterviewerResponse = (email: string, response: string) => {
  return firestore
    .collection('interviewer_invites')
    .doc(email)
    .update({ response })
}
