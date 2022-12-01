import firebase from '../firebase'

export class Interviewer {
  email: string
  name: string
  sets: Array<string>

  constructor(email: string, name: string, sets: Array<string>) {
    this.email = email
    this.name = name
    this.sets = sets
  }
}

export const interviewerController = {
  toFirestore: (interviewer: Interviewer) => {
    return {
      email: interviewer.email,
      name: interviewer.name,
      sets: interviewer.sets,
    }
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let interviewer = new Interviewer(data.email, data.name, data.sets)

    return interviewer
  },
}
