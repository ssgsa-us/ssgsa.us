import path from 'path'
import { firestore } from '../../firebase'
import { Interviewer, interviewerController } from '../../classes/interviewer'

export const createInterviewer = (
  userId: string,
  email: string,
  name: string,
  sets: Array<string>,
) => {
  const interviewer: Interviewer = new Interviewer(email, name, sets)

  firestore
    .doc(path.join('interviewer', userId))
    .withConverter(interviewerController)
    .set(interviewer)
}
