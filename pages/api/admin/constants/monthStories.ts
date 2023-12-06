import { deleteField } from 'firebase/firestore'
import { firestore } from '../../../../firebase'
import { MonthStoryType } from '../../../../types'

export const updateMonthStory = async (
  monthStoryId: string,
  monthStory: MonthStoryType,
) => {
  return firestore.doc('constants/month stories').set(
    {
      [monthStoryId]: monthStory,
    },
    { merge: true },
  )
}

export const deleteMonthStory = async (monthStoryId: string) => {
  return firestore.doc('constants/month stories').set(
    {
      [monthStoryId]: deleteField(),
    },
    { merge: true },
  )
}
