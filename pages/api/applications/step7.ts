import path from 'path'
import { firestore } from '../../../firebase'
import { ExtraCurricularsType } from '../../../types'

export const updateApplicationData = (
  userId: string,
  extraCurriculars: ExtraCurricularsType,
  formStatus: number,
) => {
  return firestore.doc(path.join('applications_data', userId)).update({
    extra_curriculars: extraCurriculars,
    form_status: formStatus,
  })
}
