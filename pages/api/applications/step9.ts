import path from 'path'
import { firestore } from '../../../firebase'

export const updateApplicationData = (
  userId: string,
  otherInformation: string,
  formStatus: number,
) => {
  return firestore
    .doc(path.join('applications_data', userId))
    .update({ other_information: otherInformation, form_status: formStatus })
}
