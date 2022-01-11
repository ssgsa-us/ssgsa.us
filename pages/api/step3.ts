import path from 'path'
import { AnswerType, TestTakenType } from '../../types'
import { firestore } from '../../firebase'

export const updateApplicationData = (
  userId: string,
  testTakens: TestTakenType,
  SOPAnswers: AnswerType,
  formStatus: number,
) => {
  firestore.doc(path.join('applications_data', userId)).update({
    test_takens: testTakens,
    sop_answers: SOPAnswers,
    form_status: formStatus,
  })
}
