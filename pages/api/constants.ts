import path from 'path'
import firebase, { firestore } from '../../firebase'
import { AwardeesType, LeadersType, MembersType } from '../../types'

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
