import firebase from '../firebase'

export class Reviewer {
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

export const reviewerController = {
  toFirestore: (reviewer: Reviewer) => {
    return {
      name: reviewer.name,
      email: reviewer.email,
      set: reviewer.set,
      personal_email: reviewer.personal_email,
    }
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let reviewer = new Reviewer(
      data.name,
      data.email,
      data.set,
      data.personal_email,
    )

    return reviewer
  },
}
