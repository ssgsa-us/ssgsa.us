import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationFaculty = (
  userId: string,
  faculty: string,
  formStatus: number,
) => {
  return firestore
    .doc(path.join('applications_data', userId))
    .update({ faculty: faculty, form_status: formStatus })
}
