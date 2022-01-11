export type AuthUser = {
  id: string
  email: string
}

export type User = {
  name: string
  email: string
  stream: string
  gender: string
  dob: string
  mobile: Number
  pwd: string
}

export type AcademicRecordType = {
  [category: string]: {
    branch: string
    collegeName: string
    duration: number
    completionYear: number
    percentage: string
  }
}
