import { firestore } from '../../../../firebase'
import { MemberType } from '../../../../types'

export const editMember = async (catId: string, members: Array<MemberType>) => {
  return firestore.doc('constants/members').set(
    {
      [catId]: { members: members },
    },
    { merge: true },
  )
}
