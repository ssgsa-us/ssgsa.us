import path from 'path'
import firebase, { firestore } from '../../firebase'
import { InterviewerInviteType } from '../../types'

export const addInterviewerInvite = (email: string, name: string) => {
  firestore.collection('interviewer_invites').doc(email).set({
    name: name,
    email: email,
    sets: [],
    reminder: 0,
    response: '',
    account_created: false,
  })
}

export const getInterviewerInvite = async (email: string) => {
  let interviewerInvite: InterviewerInviteType = await firestore
    .doc(path.join('interviewer_invites', email))
    .get()
    .then(
      (invite: firebase.firestore.DocumentSnapshot<InterviewerInviteType>) => {
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

export const updateAcceptedInterviewSets = (
  email: string,
  sets: Array<string>,
) => {
  return firestore.collection('interviewer_invites').doc(email).update({ sets })
}

export const updateIntAccCreated = (email: string) => {
  return firestore
    .collection('interviewer_invites')
    .doc(email)
    .update({ account_created: true })
}

export const getAcceptedInterviewers = async () => {
  return await firestore
    .collection('interviewer_invites')
    .where('response', '==', 'YES')
    .get()
    .then(
      (invites: firebase.firestore.QuerySnapshot<InterviewerInviteType>) => {
        let interviewers: Array<InterviewerInviteType> = []
        invites.forEach(
          (
            document: firebase.firestore.DocumentSnapshot<InterviewerInviteType>,
          ) => {
            interviewers.push(document.data())
          },
        )
        return interviewers
      },
    )
}

export const getAcceptedIntWithoutAccount = async () => {
  return await firestore
    .collection('interviewer_invites')
    .where('response', '==', 'YES')
    .where('account_created', '==', false)
    .get()
    .then(
      (invites: firebase.firestore.QuerySnapshot<InterviewerInviteType>) => {
        let interviewers: Array<InterviewerInviteType> = []
        invites.forEach(
          (
            document: firebase.firestore.DocumentSnapshot<InterviewerInviteType>,
          ) => {
            interviewers.push(document.data())
          },
        )
        return interviewers
      },
    )
}

export const getRejetedInterviewers = async () => {
  return await firestore
    .collection('interviewer_invites')
    .where('response', '==', 'NO')
    .get()
    .then(
      (invites: firebase.firestore.QuerySnapshot<InterviewerInviteType>) => {
        let interviewers: Array<InterviewerInviteType> = []
        invites.forEach(
          (
            document: firebase.firestore.DocumentSnapshot<InterviewerInviteType>,
          ) => {
            interviewers.push(document.data())
          },
        )
        return interviewers
      },
    )
}

export const getUnresponsiveInterviewers = async () => {
  return await firestore
    .collection('interviewer_invites')
    .where('response', 'not-in', ['YES', 'NO'])
    .get()
    .then(
      (invites: firebase.firestore.QuerySnapshot<InterviewerInviteType>) => {
        let interviewers: Array<InterviewerInviteType> = []
        invites.forEach(
          (
            document: firebase.firestore.DocumentSnapshot<InterviewerInviteType>,
          ) => {
            interviewers.push(document.data())
          },
        )
        return interviewers
      },
    )
}

export const sendIntReminder = (email: string, reminderCount: number) => {
  return firestore
    .collection('interviewer_invites')
    .doc(email)
    .update({ reminder: reminderCount })
}

export const sendInterviewerCredMail = async (
  name: string,
  email: string,
  password: string,
  sets: string,
) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_INTERVIEWER_CRED_MAIL_LINK}?name=${name}&email=${email}&password=${password}&sets=${sets}`,
  )
}
