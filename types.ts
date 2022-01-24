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
