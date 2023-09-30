import path from 'path'
import { firestore } from '../../../firebase'
import { CurricularActivitiesType } from '../../../types'

export const updateApplicationData = (
  userId: string,
  curricularActivities: CurricularActivitiesType,
  formStatus: number,
) => {
  return firestore.doc(path.join('applications_data', userId)).update({
    curricular_activities: curricularActivities,
    form_status: formStatus,
  })
}
