import path from 'path'
import {
  AdminPortalData,
  adminPortalDataConverter,
} from '../../classes/admin_portal_data'
import firebase, { firestore } from '../../firebase'

export const getAdminPortalData = async (userId: string) => {
  let admin_portal_data: AdminPortalData = await firestore
    .doc(path.join('admin_portal_data', userId))
    .withConverter(adminPortalDataConverter)
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<AdminPortalData>) => {
      return snapshot.data()
    })

  return admin_portal_data
}
