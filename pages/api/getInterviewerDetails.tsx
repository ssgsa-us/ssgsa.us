import path from 'path'
import firebase, { firestore } from '../../firebase'
import { Interviewer, interviewerController } from '../../classes/interviewer'

export const getInterviewerDetails = async (email: string) => {
  let interviewer: Interviewer = await firestore
    .collection('interviewer')
    .where('email', '==', email)
    .withConverter(interviewerController)
    .get()
    .then((interviewers: firebase.firestore.QuerySnapshot<Interviewer>) => {
      if (interviewers.size) {
        let interviewer: Interviewer
        interviewers.forEach(
          (document: firebase.firestore.QueryDocumentSnapshot<Interviewer>) => {
            interviewer = document.data()
          },
        )
        return interviewer
      }
      return null
    })

  return interviewer
}

export const getInterviewerDetailsById = async (interviewerId: string) => {
  let interviewer: Interviewer = await firestore
    .doc(path.join('interviewer', interviewerId))
    .withConverter(interviewerController)
    .get()
    .then(
      (interviewer: firebase.firestore.QueryDocumentSnapshot<Interviewer>) => {
        return interviewer.data()
      },
    )

  return interviewer
}
