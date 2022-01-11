import path from 'path'
import { firestore } from '../../firebase'

export const createApplicationData = (userId) => {
  firestore.doc(path.join('applications_data', userId)).set({ form_status: 1 })
}
