import path from 'path'
import firebase, { firestore } from '../../firebase'

export const addInterviewerInvite = (email: string, name: string) => {
  firestore.collection('interviewer_invites').doc(email).set({
    name: name,
    reminder: 0,
    response: '',
  })
}

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

export const getAcceptedInterviewers = async () => {
  return await firestore
    .collection('interviewer_invites')
    .where('response', '==', 'YES')
    .get()
    .then(
      (
        invites: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
      ) => {
        let Interviewers = []
        invites.forEach(
          (
            document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
          ) => {
            Interviewers.push({
              ...document.data(),
              email: document.id,
            })
          },
        )
        return Interviewers
      },
    )
}

export const getRejetedInterviewers = async () => {
  return await firestore
    .collection('interviewer_invites')
    .where('response', '==', 'NO')
    .get()
    .then(
      (
        invites: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
      ) => {
        let Interviewers = []
        invites.forEach(
          (
            document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
          ) => {
            Interviewers.push({
              ...document.data(),
              email: document.id,
            })
          },
        )
        return Interviewers
      },
    )
}

export const getUnresponsiveInterviewers = async () => {
  return await firestore
    .collection('interviewer_invites')
    .where('response', 'not-in', ['YES', 'NO'])
    .get()
    .then(
      (
        invites: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
      ) => {
        let Interviewers = []
        invites.forEach(
          (
            document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
          ) => {
            Interviewers.push({
              ...document.data(),
              email: document.id,
            })
          },
        )
        return Interviewers
      },
    )
}

export const sendIntReminder = (email: string, reminderCount: number) => {
  return firestore
    .collection('interviewer_invites')
    .doc(email)
    .update({ reminder: reminderCount })
}
