export type AuthUser = {
  id: string
  email: string
  role: string // Used to authorize user
  sets: Array<string> // Sets are only used for reviewer and interviewer
}

export type AcademicRecordType = {
  [key: number]: {
    degreeLevel: 'Bachelor' | 'Master' | 'Doctoral' | ''
    degreeName: string
    branch: string
    faculty: string
    college: string
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
