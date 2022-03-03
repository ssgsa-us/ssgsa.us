import path from 'path'
import {
  ApplicationData,
  applicationDataConverterForAdmin,
} from '../../classes/application_data'
import firebase, { firestore } from '../../firebase'

export const getApplicationDataForAdmin = async (userId: string) => {
  let application_data: ApplicationData = await firestore
    .doc(path.join('applications_data', userId))
    .withConverter(applicationDataConverterForAdmin)
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<ApplicationData>) => {
      return snapshot.data()
    })

  return application_data
}
