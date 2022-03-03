import {
  ApplicationData,
  applicationDataConverterForAdmin,
} from '../../classes/application_data'
import firebase, { firestore } from '../../firebase'

type Applications = {
  [key: string]: ApplicationData
}

export const getCompletedApplications = async () => {
  let completedApplications: Applications = await firestore
    .collection('applications_data')
    .where('form_status', '==', 6)
    .withConverter(applicationDataConverterForAdmin)
    .get()
    .then((value: firebase.firestore.QuerySnapshot) => {
      let applications: Applications = {}
      value.forEach(
        (
          document: firebase.firestore.QueryDocumentSnapshot<ApplicationData>,
        ) => {
          applications[document.id] = document.data()
        },
      )
      return applications
    })

  return completedApplications
}

export const getApplicationsWithGivenStatus = async (
  application_status: string,
) => {
  let applicationsWithGivenStatus: Applications = await firestore
    .collection('applications_data')
    .where('form_status', '==', 6)
    .where('application_status', '==', application_status)
    .withConverter(applicationDataConverterForAdmin)
    .get()
    .then((value: firebase.firestore.QuerySnapshot) => {
      let applications: Applications = {}
      value.forEach(
        (
          document: firebase.firestore.QueryDocumentSnapshot<ApplicationData>,
        ) => {
          applications[document.id] = document.data()
        },
      )
      return applications
    })

  return applicationsWithGivenStatus
}
