import path from 'path'
import { ResearchExperiencesType } from '../../../types'
import { firestore } from '../../../firebase'

export const updateApplicationData = (
  userId: string,
  researchExperiences: ResearchExperiencesType,
  formStatus: number,
) => {
  return firestore.doc(path.join('applications_data', userId)).update({
    research_experience: researchExperiences,
    form_status: formStatus,
  })
}
