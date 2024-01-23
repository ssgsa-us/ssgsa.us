import { User } from './classes/user'

export type Users = { [key: string]: User }

export type AuthUser = {
  id: string
  email: string
  roles: Array<string> // Used to authorize user
  review_sets: Array<string> // Sets used for reviewer
  interview_sets: Array<string> // Sets used for interviewer
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
  field: string
  name: string
}

export type AwardeeSessionType = {
  awardees: Array<AwardeeType>
  index: number
  session: string
}

export type AwardeesType = { [id: string]: AwardeeSessionType }

export type LeaderType = {
  imageUrl: string
  name: string
  place: string
  scholar: string
  term: string
}

export type LeaderCategoryType = {
  category: string
  index: number
  members: Array<LeaderType>
}

export type LeadersType = { [id: string]: LeaderCategoryType }

export type MemberType = {
  imageUrl: string
  name: string
  place: string
  position: string
  scholar: string
  university: string
}

export type MemberCategoryType = {
  category: string
  index: number
  members: Array<MemberType>
}

export type MembersType = { [id: string]: MemberCategoryType }

export type MonthStoryType = {
  index: number
  issue: string
  link: string
  name: string
  title: string
}

export type MonthStoriesType = { [id: string]: MonthStoryType }

export type NewsletterType = {
  index: number
  link: string
  title: string
}

export type NewslettersType = { [id: string]: NewsletterType }

export type ResourceType = {
  link: string
  text: string
  title: string
}

export type ResourceCategoryType = {
  category: string
  index: number
  resources: Array<ResourceType>
}

export type ResourcesType = { [id: string]: ResourceCategoryType }

export type ScholarType = {
  imageUrl: string
  name: string
  words: string
}

export type ScholarsType = { [id: string]: ScholarType }

export type SuccScholarType = {
  field: string
  name: string
}

export type SuccScholarSessionType = {
  index: number
  scholars: Array<SuccScholarType>
  session: string
}

export type SuccessfulScholarsType = { [id: string]: SuccScholarSessionType }

export type TestimonialType = {
  imageUrl: string
  name: string
  position: string
  words: string
}

export type TestimonialsType = { [id: string]: TestimonialType }

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
  STEP5_INSTRUCTION?: string
  STEP5_INSTRUCTION1?: string
  STEP5_INSTRUCTION2?: string
  STEP5_INSTRUCTION3?: string
  STEP5_INSTRUCTION4?: string
  STEP5_INSTRUCTION5?: string
  STEP5_INSTRUCTION6?: string
  STEP6_INSTRUCTION?: string
}

export type ReviewerInviteType = {
  name: string
  reminder: number
  response: 'YES' | 'NO'
  account_created: boolean
}
