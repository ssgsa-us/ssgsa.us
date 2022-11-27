export type AuthUser = {
  id: string
  email: string
}

export type User = {
  name: string
  email: string
  mobile: Number
}

export type AcademicRecordType = {
  [category: string]: {
    branch: string
    collegeName: string
    duration: number
    completionYear: number
    percentage: number
  }
}

export type AnswerType = {
  [key: string]: string
}

export type DocumentsType = {
  [documentType: string]: string
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
