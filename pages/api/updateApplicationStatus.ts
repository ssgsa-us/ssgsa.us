import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationStatus = (
  applId: string,
  applicationStatus: string,
) => {
  return firestore.doc(path.join('admin_portal_data', applId)).set({
    application_status: applicationStatus,
  })
}
