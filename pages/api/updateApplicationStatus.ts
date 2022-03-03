import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationStatus = (
  applId: string,
  applicationStatus: string,
) => {
  return firestore.doc(path.join('applications_data', applId)).update({
    application_status: applicationStatus,
  })
}
