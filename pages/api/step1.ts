import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationData = (
  userId: string,
  name: string,
  email: string,
  contactNo: number,
  gender: string,
  enrollNo: string,
  nationality: string,
  formStatus: number,
) => {
  firestore.doc(path.join('applications_data', userId)).update({
    name: name,
    email: email,
    contact: contactNo,
    gender: gender,
    enrollment: enrollNo,
    nationality: nationality,
    form_status: formStatus,
  })
}
