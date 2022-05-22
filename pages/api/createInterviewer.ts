import path from 'path'
import { firestore } from '../../firebase'
import { Interviewer, interviewerController } from '../../classes/interviewer'

export const createInterviewer = (
  userId: string,
  email: string,
  personal_email: string,
  name: string,
  set: string,
) => {
  const interviewer: Interviewer = new Interviewer(
    name,
    email,
    set,
    personal_email,
  )

  firestore
    .doc(path.join('interviewer', userId))
    .withConverter(interviewerController)
    .set(interviewer)
}
