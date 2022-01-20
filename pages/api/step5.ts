import path from 'path'
import { firestore } from '../../firebase'

export const updateFormStatus = (userId: string, formStatus: number) => {
  firestore
    .doc(path.join('applications_data', userId))
    .update({ form_status: formStatus })
}
