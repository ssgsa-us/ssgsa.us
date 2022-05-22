import firebase from '../firebase'

export class Interviewer {
  name: string
  email: string
  set: string
  personal_email: string

  constructor(
    name: string,
    email: string,
    set: string,
    personal_email: string,
  ) {
    this.name = name
    this.email = email
    this.set = set
    this.personal_email = personal_email
  }
}

export const interviewerController = {
  toFirestore: (interviewer: Interviewer) => {
    return {
      name: interviewer.name,
      email: interviewer.email,
      set: interviewer.set,
      personal_email: interviewer.personal_email,
    }
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let interviewer = new Interviewer(
      data.name,
      data.email,
      data.set,
      data.personal_email,
    )

    return interviewer
  },
}
