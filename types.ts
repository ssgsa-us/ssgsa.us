import { User } from './classes/user'

export type Users = { [key: string]: User }

export type AuthUser = {
  id: string
  email: string
  role: string // Used to authorize user
  sets: Array<string> // Sets are only used for reviewer and interviewer
  verificationEmailEpoch: number
}

export type AcademicRecordType = {
  [key: number]: {
    degreeLevel: 'Bachelor' | 'Master' | 'Doctoral' | ''
    degreeName: string
    faculty: string
    otherFaculty: string
    department: string
    university: string
    currentlyEnrolled: boolean | null
    startedYear: number
    completionYear: number
    gradeCriteria: 'CGPA' | 'Percentage' | null
    grades: number
    document: string
  }
}

export type ResearchExperiencesType = {
  [key: number]: {
    university: string
    title: string
    mentor: string
    currentlyWorking: boolean | null
    startDate: string
    endDate: string
    description: string
    publications: PublicationsType
    newPublicationKey: number
  }
}

export type PublicationsType = {
  [key: number]: {
    titleAndDate: string
    conferenceName: string
    link: string
  }
}

export type WorkExperiencesType = {
  [key: number]: {
    organization: string
    title: string
    currentlyWorking: boolean | null
    startDate: string
    endDate: string
    description: string
    document: string
  }
}

export type PosterOrWorkshopsType = {
  [key: number]: {
    category: 'Poster' | 'Workshop' | 'Summer School' | 'Other' | ''
    otherCategory: string
    title: string
    duration: string
    description: string
    document: string
  }
}

export type CurricularActivitiesType = {
  description: string
  document: string
  others: string
  others_document: string
}

export type ExtraCurricularsType = {
  description: string
  document: string
}

export type AnswerType = {
  [key: string]: string
}

export type AwardeeType = {
  awardees: Array<{
    field: string
    name: string
  }>
  index: number
  session: string
}

export type LeaderType = {
  category: string
  index: number
  members: Array<{
    imageUrl: string
    name: string
    place: string
    scholar: string
    term: string
  }>
}

export type MemberType = {
  category: string
  index: number
  members: Array<{
    imageUrl: string
    name: string
    place: string
    position: string
    scholar: string
    university: string
  }>
}

export type MonthStoryType = {
  index: number
  issue: string
  link: string
  name: string
  title: string
}

export type NewsletterType = {
  index: number
  link: string
  title: string
}

export type ResourceType = {
  category: string
  index: number
  resources: Array<{
    link: string
    text: string
    title: string
  }>
}

export type ScholarType = {
  imageUrl: string
  name: string
  words: string
}

export type SuccessfulScholarType = {
  index: number
  scholars: Array<{
    field: string
    name: string
  }>
  session: number
}

export type TestimonialType = {
  imageUrl: string
  name: string
  position: string
  words: string
}

export type ApplicationDatesType = {
  session?: string
  openingDate?: string
  closingDate?: string
  shortlistAnnouncement?: string
  interviewDates?: string
  awardeesAnnouncement?: string
  orientationDate?: string
  mentorAllotmentDate?: string
}

export type ReviewMarksType = {
  // key will be reviewer Id
  [key: string]: {
    formStatus: number // Form Status for specific reviewer
    academicGrades: {
      // key will be academic record id
      [key: number]: {
        isGradeCorrect: boolean | null
        correctGrades: number
      }
    }
    totalAcademicMarks: number
    curricularMarks: number
    extracurricularMarks: number
    sopMarks: {
      // key will be SOP id
      [key: string]: number
    }
    totalSOPMarks: number
    remark: string
    totalMarks: number
  }
}

export type ReviewerInstructionsType = {
  ACADEMIC_MAX_MARKS?: number
  CURRICULAR_MAX_MARKS?: number
  EXTRACURRICULAR_MAX_MARKS?: number
  SOP_MAX_MARKS?: number
  RUBRIC_URL?: string
  STEP1_INSTRUCTION?: string
  STEP1_INSTRUCTION1?: string
  STEP2_INSTRUCTION?: string
  STEP2_INSTRUCTION1?: string
  STEP2_INSTRUCTION2?: string
  STEP3_INSTRUCTION?: string
  STEP3_INSTRUCTION1?: string
  STEP3_INSTRUCTION2?: string
  STEP3_INSTRUCTION3?: string
  STEP3_INSTRUCTION4?: string
  STEP4_INSTRUCTION?: string
  STEP4_INSTRUCTION1?: string
  STEP4_INSTRUCTION2?: string
  STEP4_INSTRUCTION3?: string
  STEP5_INSTRUCTION?: string
  STEP5_INSTRUCTION1?: string
  STEP5_INSTRUCTION2?: string
  STEP5_INSTRUCTION3?: string
  STEP5_INSTRUCTION4?: string
  STEP5_INSTRUCTION5?: string
  STEP5_INSTRUCTION6?: string
  STEP5_INSTRUCTION7?: string
  STEP6_INSTRUCTION?: string
}

export type InterviewMarksType = {
  // key will be interviewer Id
  [key: string]: {
    formStatus: number // Form Status for specific interviewer
    higherStudiesMotivation: number
    communication: number
    researchAptitude: number
    motivationToGoBack: number
    totalMarks: number
    remark: string
  }
}

export type InterviewerInstructionsType = {
  HIGHER_STUDIES_MOTIVATION?: number
  COMMUNICATION?: number
  RESEARCH_APTITUDE?: number
  MOTIVATION_TO_GO_BACK?: number
  STEP1_INSTRUCTION?: string
  STEP2_INSTRUCTION?: string
  STEP3_INSTRUCTION?: string
  STEP4_INSTRUCTION?: string
}
