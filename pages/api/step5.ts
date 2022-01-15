import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationData = (userId: string) => {
  firestore
    .doc(path.join('applications_data', userId))
    .update({ isSubmitted: true })
}
