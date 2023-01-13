import {
  AdminPortalData,
  adminPortalDataConverter,
} from '../../classes/admin_portal_data'
import {
  ApplicationData,
  applicationDataConverter,
} from '../../classes/application_data'
import firebase, { firestore } from '../../firebase'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

export const getInterviewerSetApplications = async (interviewerSet: string) => {
  let applications: Applications = await firestore
    .collection('applications_data')
    .where('form_status', '==', 6)
    .withConverter(applicationDataConverter)
    .get()
    .then(
      async (
        applications_data: firebase.firestore.QuerySnapshot<ApplicationData>,
      ) => {
        let applications: Applications = await firestore
          .collection('admin_portal_data')
          .where('interview_set', '==', interviewerSet)
          .where('application_status', 'in', [4, 5])
          .withConverter(adminPortalDataConverter)
          .get()
          .then(
            (
              admin_portal_data: firebase.firestore.QuerySnapshot<AdminPortalData>,
            ) => {
              let applications: Applications = {}

              admin_portal_data.forEach(
                (
                  document: firebase.firestore.QueryDocumentSnapshot<AdminPortalData>,
                ) => {
                  applications[document.id] = {
                    applicationData: new ApplicationData(0, '', 0),
                    adminPortalData: document.data(),
                  }
                },
              )

              applications_data.forEach(
                (
                  document: firebase.firestore.QueryDocumentSnapshot<ApplicationData>,
                ) => {
                  if (applications[document.id])
                    applications[document.id].applicationData = document.data()
                },
              )

              return applications
            },
          )
        return applications
      },
    )

  return applications
}
