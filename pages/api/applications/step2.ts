import path from 'path'
import { AcademicRecordType } from '../../../types'
import { firestore } from '../../../firebase'

export const updateApplicationData = (
  userId: string,
  academicRecord: AcademicRecordType,
  formStatus: number,
) => {
  return firestore
    .doc(path.join('applications_data', userId))
    .update({ academic_record: academicRecord, form_status: formStatus })
}
