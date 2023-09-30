import path from 'path'
import { firestore } from '../../firebase'
import { PosterOrWorkshopsType } from '../../types'

export const updateApplicationData = (
  userId: string,
  posterOrWorkshops: PosterOrWorkshopsType,
  formStatus: number,
) => {
  return firestore
    .doc(path.join('applications_data', userId))
    .update({ poster_or_workshops: posterOrWorkshops, form_status: formStatus })
}
