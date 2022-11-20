import { AcademicRecordType, AnswerType, DocumentsType } from '../types'
import firebase from '../firebase'

export class ApplicationData {
  name: string
  enrollment: string
  email: string
  contact: number
  current_position: string
  target_program: string
  target_date: string
  target_country: string
  faculty: string
  academic_record: AcademicRecordType
  documents: DocumentsType
  sop_answers: AnswerType
  form_status: number

  constructor(form_status: number = 1) {
    this.form_status = form_status
  }

  step1(
    name: string,
    enrollment: string,
    email: string,
    contact: number,
    current_position: string,
    target_program: string,
    target_date: string,
    target_country: string,
  ) {
    this.name = name
    this.enrollment = enrollment
    this.email = email
    this.contact = contact
    this.current_position = current_position
    this.target_program = target_program
    this.target_date = target_date
    this.target_country = target_country
  }

  step2(academic_record: AcademicRecordType) {
    this.academic_record = academic_record
  }

  step3(sop_answers: AnswerType) {
    this.sop_answers = sop_answers
  }

  step4(documents: DocumentsType) {
    this.documents = documents
  }

  step5(faculty: string) {
    this.faculty = faculty
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
      data.enrollment,
      data.email,
      data.contact,
      data.current_position,
      data.target_program,
      data.target_date,
      data.target_country,
    )
    if (data.form_status >= 2) {
      applicationData.step2(data.academic_record)
    }
    if (data.form_status >= 3) {
      applicationData.step3(data.sop_answers)
    }
    if (data.form_status >= 4) {
      applicationData.step4(data.documents)
    }
    if (data.form_status >= 5) {
      applicationData.step5(data.faculty)
    }
    return applicationData
  },
}
