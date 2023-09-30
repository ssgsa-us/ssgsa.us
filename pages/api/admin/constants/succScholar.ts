import { deleteField } from 'firebase/firestore'
import { firestore } from '../../../../firebase'
import { SuccScholarSessionType, SuccScholarType } from '../../../../types'

export const updateSuccScholar = async (
  sessionId: string,
  succScholars: Array<SuccScholarType>,
) => {
  return firestore.doc('constants/successful scholars').set(
    {
      [sessionId]: { scholars: succScholars },
    },
    { merge: true },
  )
}

export const updateSuccScholarSession = async (
  sessionId: string,
  session: SuccScholarSessionType,
) => {
  return firestore.doc('constants/successful scholars').set(
    {
      [sessionId]: session,
    },
    { merge: true },
  )
}

export const deleteSuccScholarSession = async (sessionId: string) => {
  return firestore.doc('constants/successful scholars').set(
    {
      [sessionId]: deleteField(),
    },
    { merge: true },
  )
}
