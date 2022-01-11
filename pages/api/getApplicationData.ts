import path from 'path'
import {
  ApplicationData,
  applicationDataConverter,
} from '../../classes/application_data'
import firebase, { firestore } from '../../firebase'

export const getApplicationData = async (userId: string) => {
  let application_data: ApplicationData = await firestore
    .doc(path.join('applications_data', userId))
    .withConverter(applicationDataConverter)
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<ApplicationData>) => {
      return snapshot.data()
    })

  return application_data
}
