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

export type AwardeesType = {
  [id: string]: {
    session: string
    awardees: Array<{
      field: string
      name: string
    }>
  }
}

export type LeadersType = {
  [id: string]: {
    category: string
    members: Array<{
      imageUrl: string
      name: string
      place: string
      scholar: string
      term: string
    }>
  }
}

export type MembersType = {
  [id: string]: {
    category: string
    members: Array<{
      imageUrl: string
      name: string
      place: string
      position: string
      scholar: string
      university: string
    }>
  }
}

export type ResourcesType = {
  [id: string]: {
    category: string
    resources: Array<{
      link: string
      text: string
      title: string
    }>
  }
}

export type ScholarsType = {
  [id: string]: {
    imageUrl: string
    name: string
    words: string
  }
}

export type SuccessfulScholarsType = {
  [id: string]: {
    session: number
    scholars: Array<{
      field: string
      name: string
    }>
  }
}

export type TestimonialsType = {
  [id: string]: {
    imageUrl: string
    name: string
    position: string
    words: string
  }
}
