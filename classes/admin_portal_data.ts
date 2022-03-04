import firebase from '../firebase'

export class AdminPortalData {
  application_status: string // values are: 'removed', 'finalised for review' and 'finalised for interview'
  review_marks: number
  interview_marks: number

  updateDetails(
    application_status: string,
    review_marks: number,
    interview_marks: number,
  ) {
    this.application_status = application_status
    this.review_marks = review_marks
    this.interview_marks = interview_marks
  }
}

export const adminPortalDataConverter = {
  toFirestore: (admin_portal_data: AdminPortalData) => {
    return {}
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let adminPortalData = new AdminPortalData()

    adminPortalData.updateDetails(
      data.application_status,
      data.review_marks,
      data.interview_marks,
    )
    return adminPortalData
  },
}
