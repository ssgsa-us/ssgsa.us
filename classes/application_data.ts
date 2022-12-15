import firebase from '../firebase'
import {
  AcademicRecordType,
  AnswerType,
  CurricularActivitiesType,
  DocumentsType,
  ExtraCurricularsType,
  PosterOrWorkshopsType,
  ResearchExperiencesType,
  WorkExperiencesType,
} from '../types'

export class ApplicationData {
  name: string
  enrollment: string
  enrollment_proof_doc: string
  email: string
  contact: number
  current_position: string
  target_program: string
  target_date: string
  target_country: string
  faculty: string
  academic_record: AcademicRecordType
  research_experience: ResearchExperiencesType
  work_experience: WorkExperiencesType
  poster_or_workshops: PosterOrWorkshopsType
  curricular_activities: CurricularActivitiesType
  extra_curriculars: ExtraCurricularsType
  sop_answers: AnswerType
  other_information: string
  documents: DocumentsType
  form_status: number

  constructor(form_status: number = 1) {
    this.form_status = form_status
  }

  step1(
    name: string,
    enrollment: string,
    enrollment_proof_doc: string,
    email: string,
    contact: number,
    current_position: string,
    target_program: string,
    target_date: string,
    target_country: string,
  ) {
    this.name = name
    this.enrollment = enrollment
    this.enrollment_proof_doc = enrollment_proof_doc
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

  step3(research_experience: ResearchExperiencesType) {
    this.research_experience = research_experience
  }

  step4(work_experience: WorkExperiencesType) {
    this.work_experience = work_experience
  }

  step5(poster_or_workshops: PosterOrWorkshopsType) {
    this.poster_or_workshops = poster_or_workshops
  }

  step6(curricular_activities: CurricularActivitiesType) {
    this.curricular_activities = curricular_activities
  }

  step7(extra_curriculars: ExtraCurricularsType) {
    this.extra_curriculars = extra_curriculars
  }

  step8(sop_answers: ExtraCurricularsType) {
    this.sop_answers = sop_answers
  }

  step9(other_information: string) {
    this.other_information = other_information
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
      data.enrollment_proof_doc,
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
      applicationData.step3(data.research_experience)
    }
    if (data.form_status >= 4) {
      applicationData.step4(data.work_experience)
    }
    if (data.form_status >= 5) {
      applicationData.step5(data.poster_or_workshops)
    }
    if (data.form_status >= 6) {
      applicationData.step6(data.curricular_activities)
    }
    if (data.form_status >= 7) {
      applicationData.step7(data.extra_curriculars)
    }
    if (data.form_status >= 8) {
      applicationData.step8(data.sop_answers)
    }
    if (data.form_status >= 9) {
      applicationData.step9(data.other_information)
    }
    return applicationData
  },
}
