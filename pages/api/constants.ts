import path from 'path'
import firebase, { firestore } from '../../firebase'
import {
  ApplicationDatesType,
  AwardeeType,
  LeaderType,
  MemberType,
  MonthStoryType,
  NewsletterType,
  ResourceType,
  ScholarType,
  SuccessfulScholarType,
  TestimonialType,
} from '../../types'

type AwardeesType = { [id: string]: AwardeeType }
type LeadersType = { [id: string]: LeaderType }
type MembersType = { [id: string]: MemberType }
type MonthStoriesType = { [id: string]: MonthStoryType }
type NewslettersType = { [id: string]: NewsletterType }
type ResourcesType = { [id: string]: ResourceType }
type ScholarsType = { [id: string]: ScholarType }
type SuccessfulScholarsType = { [id: string]: SuccessfulScholarType }
type TestimonialsType = { [id: string]: TestimonialType }

export const getAwardees = async () => {
  let awardees: AwardeesType = await firestore
    .doc(path.join('constants', 'awardees'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<AwardeesType>) => {
      return snapshot.data()
    })

  return awardees
}

export const getLeadershipHistory = async () => {
  let leaders: LeadersType = await firestore
    .doc(path.join('constants', 'leadership history'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<LeadersType>) => {
      return snapshot.data()
    })

  return leaders
}

export const getMembers = async () => {
  let members: MembersType = await firestore
    .doc(path.join('constants', 'members'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<MembersType>) => {
      return snapshot.data()
    })

  return members
}

export const getMonthStories = async () => {
  let monthStories: MonthStoriesType = await firestore
    .doc(path.join('constants', 'month stories'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<MonthStoriesType>) => {
      return snapshot.data()
    })

  return monthStories
}

export const getNewsletters = async () => {
  let newsletters: NewslettersType = await firestore
    .doc(path.join('constants', 'newsletters'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<NewslettersType>) => {
      return snapshot.data()
    })

  return newsletters
}

export const getResources = async () => {
  let resources: ResourcesType = await firestore
    .doc(path.join('constants', 'resources'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<ResourcesType>) => {
      return snapshot.data()
    })

  return resources
}

export const getScholars = async () => {
  let scholars: ScholarsType = await firestore
    .doc(path.join('constants', 'scholars'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<ScholarsType>) => {
      return snapshot.data()
    })

  return scholars
}

export const getSuccessfulScholarsList = async () => {
  let scholars: SuccessfulScholarsType = await firestore
    .doc(path.join('constants', 'successful scholars'))
    .get()
    .then(
      (
        snapshot: firebase.firestore.DocumentSnapshot<SuccessfulScholarsType>,
      ) => {
        return snapshot.data()
      },
    )

  return scholars
}

export const getTestimonials = async () => {
  let testimonials: TestimonialsType = await firestore
    .doc(path.join('constants', 'testimonials'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<TestimonialsType>) => {
      return snapshot.data()
    })

  return testimonials
}

export const getApplicationDates = async () => {
  let applicationDates: ApplicationDatesType = await firestore
    .doc(path.join('constants', 'application dates'))
    .get()
    .then(
      (snapshot: firebase.firestore.DocumentSnapshot<ApplicationDatesType>) => {
        return snapshot.data()
      },
    )

  return applicationDates
}
