import { AcademicRecordType } from '../types'
import firebase from '../firebase'

export class ApplicationData {
  name: string
  email: string
  contact: number
  gender: string
  enrollment: string
  nationality: string
  academic_record: AcademicRecordType
  form_status: number
  isSubmitted: boolean

  constructor(form_status: number = 1) {
    this.form_status = form_status
    this.isSubmitted = false
  }

  step1(
    name: string,
    email: string,
    contact: number,
    gender: string,
    enrollment: string,
    nationality: string,
  ) {
    this.name = name
    this.email = email
    this.contact = contact
    this.gender = gender
    this.enrollment = enrollment
    this.nationality = nationality
  }

  step2(academic_record: AcademicRecordType) {
    this.academic_record = academic_record
  }

  step5() {
    this.isSubmitted = true
  }
}

export const applicationDataConverter = {
  toFirestore: (application_data: ApplicationData) => {
    return {}
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let applicationData = new ApplicationData(data.form_status)
    applicationData.step1(
      data.name,
      data.email,
      data.contact,
      data.gender,
      data.enrollment,
      data.nationality,
    )
    if (data.form_status >= 2) {
      applicationData.step2(data.academic_record)
    }
    if (data.form_status == 5) {
      applicationData.step5()
    }
    return applicationData
  },
}
