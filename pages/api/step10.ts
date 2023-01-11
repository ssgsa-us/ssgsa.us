import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationData = (userId: string, formStatus: number) => {
  return firestore
    .doc(path.join('applications_data', userId))
    .update({ form_status: formStatus })
}
