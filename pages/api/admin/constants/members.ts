import { deleteField } from 'firebase/firestore'
import { firestore } from '../../../../firebase'
import { MemberCategoryType, MemberType } from '../../../../types'

export const updateMembers = async (
  catId: string,
  members: Array<MemberType>,
) => {
  return firestore.doc('constants/members').set(
    {
      [catId]: { members: members },
    },
    { merge: true },
  )
}

export const updateMembersCategory = async (
  catId: string,
  category: MemberCategoryType,
) => {
  return firestore.doc('constants/members').set(
    {
      [catId]: category,
    },
    { merge: true },
  )
}

export const deleteMembersCategory = async (catId: string) => {
  return firestore.doc('constants/members').set(
    {
      [catId]: deleteField(),
    },
    { merge: true },
  )
}
