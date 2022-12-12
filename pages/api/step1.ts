import path from 'path'
import { firestore } from '../../firebase'

export const updateApplicationData = (
  userId: string,
  name: string,
  enrollNo: string,
  email: string,
  contactNo: number,
  currentPosition: string,
  targetProgram: string,
  targetDate: string,
  targetCountry: string,
  enrollProofDoc: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('applications_data', userId)).update({
    name: name,
    enrollment: enrollNo,
    email: email,
    contact: contactNo,
    current_position: currentPosition,
    target_program: targetProgram,
    target_date: targetDate,
    target_country: targetCountry,
    enrollment_proof_doc: enrollProofDoc,
    form_status: formStatus,
  })
}
