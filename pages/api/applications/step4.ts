import path from 'path'
import { WorkExperiencesType } from '../../../types'
import { firestore } from '../../../firebase'

export const updateApplicationData = (
  userId: string,
  workExperiences: WorkExperiencesType,
  formStatus: number,
) => {
  return firestore.doc(path.join('applications_data', userId)).update({
    work_experience: workExperiences,
    form_status: formStatus,
  })
}
