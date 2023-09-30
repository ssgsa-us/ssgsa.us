import path from 'path'
import { AnswerType } from '../../../types'
import { firestore } from '../../../firebase'

export const updateApplicationData = (
  userId: string,
  SOPAnswers: AnswerType,
  formStatus: number,
) => {
  return firestore.doc(path.join('applications_data', userId)).update({
    sop_answers: SOPAnswers,
    form_status: formStatus,
  })
}
