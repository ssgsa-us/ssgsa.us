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
    awardees: Array<{
      field: string
      name: string
    }>
    index: number
    session: string
  }
}

export type LeadersType = {
  [id: string]: {
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
}

export type MembersType = {
  [id: string]: {
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
}

export type MonthStoriesType = {
  [id: string]: {
    index: number
    issue: string
    link: string
    name: string
    title: string
  }
}

export type NewslettersType = {
  [id: string]: {
    index: number
    link: string
    title: string
  }
}

export type ResourcesType = {
  [id: string]: {
    category: string
    index: number
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
    index: number
    scholars: Array<{
      field: string
      name: string
    }>
    session: number
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
