import { deleteField } from 'firebase/firestore'
import { firestore } from '../../../../firebase'
import { AwardeeSessionType, AwardeeType } from '../../../../types'

export const updateAwardees = async (
  sessionId: string,
  awardees: Array<AwardeeType>,
) => {
  return firestore.doc('constants/awardees').set(
    {
      [sessionId]: { awardees: awardees },
    },
    { merge: true },
  )
}

export const updateAwardeesSession = async (
  sessionId: string,
  session: AwardeeSessionType,
) => {
  return firestore.doc('constants/awardees').set(
    {
      [sessionId]: session,
    },
    { merge: true },
  )
}

export const deleteAwardeesSession = async (sessionId: string) => {
  return firestore.doc('constants/awardees').set(
    {
      [sessionId]: deleteField(),
    },
    { merge: true },
  )
}
