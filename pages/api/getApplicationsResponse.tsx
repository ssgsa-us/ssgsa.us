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

type PartialApplications = {
  [key: string]: ApplicationData
}

export const getPartialApplications = async () => {
  let partialApplications: PartialApplications = await firestore
    .collection('applications_data')
    .where('form_status', '!=', 6)
    .withConverter(applicationDataConverter)
    .get()
    .then(
      async (
        applications_data: firebase.firestore.QuerySnapshot<ApplicationData>,
      ) => {
        let partialApplications: PartialApplications = {}
        applications_data.forEach(
          (
            document: firebase.firestore.QueryDocumentSnapshot<ApplicationData>,
          ) => {
            partialApplications[document.id] = document.data()
          },
        )

        return partialApplications
      },
    )

  return partialApplications
}

export const getCompletedApplications = async () => {
  let completedApplications: Applications = await firestore
    .collection('applications_data')
    .where('form_status', '==', 6)
    .orderBy('faculty')
    .withConverter(applicationDataConverter)
    .get()
    .then(
      async (
        applications_data: firebase.firestore.QuerySnapshot<ApplicationData>,
      ) => {
        let applications: Applications = await firestore
          .collection('admin_portal_data')
          .withConverter(adminPortalDataConverter)
          .get()
          .then(
            (
              admin_portal_data: firebase.firestore.QuerySnapshot<AdminPortalData>,
            ) => {
              let applications: Applications = {}
              applications_data.forEach(
                (
                  document: firebase.firestore.QueryDocumentSnapshot<ApplicationData>,
                ) => {
                  applications[document.id] = {
                    applicationData: document.data(),
                    adminPortalData: new AdminPortalData(),
                  }
                },
              )

              admin_portal_data.forEach(
                (
                  document: firebase.firestore.QueryDocumentSnapshot<AdminPortalData>,
                ) => {
                  if (applications[document.id])
                    applications[document.id].adminPortalData = document.data()
                },
              )

              return applications
            },
          )
        return applications
      },
    )

  return completedApplications
}

export const getApplicationsWithGivenStatus = async (
  application_status: string,
) => {
  let applicationsWithGivenStatus: Applications = await firestore
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
          .where('application_status', '==', application_status)
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
                    applicationData: new ApplicationData(),
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

  return applicationsWithGivenStatus
}
