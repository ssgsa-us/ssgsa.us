import { deleteField } from 'firebase/firestore'
import { firestore } from '../../../../firebase'
import { NewsletterType } from '../../../../types'

export const updateNewsletter = async (
  newsletterId: string,
  newsletter: NewsletterType,
) => {
  return firestore.doc('constants/newsletters').set(
    {
      [newsletterId]: newsletter,
    },
    { merge: true },
  )
}

export const deleteNewsletter = async (newsletterId: string) => {
  return firestore.doc('constants/newsletters').set(
    {
      [newsletterId]: deleteField(),
    },
    { merge: true },
  )
}
