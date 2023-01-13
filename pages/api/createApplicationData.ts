import path from 'path'
import { firestore } from '../../firebase'

export const createApplicationData = (
  userId: string,
  email: string,
  contact: number,
) => {
  firestore.doc(path.join('applications_data', userId)).set({
    form_status: 1,
    email: email,
    contact: contact,
  })
}
