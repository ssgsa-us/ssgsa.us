import firebase from '../firebase'

export class Reviewer {
  name: string
  email: string
  set: string

  constructor(name: string, email: string, set: string) {
    this.name = name
    this.email = email
    this.set = set
  }
}

export const reviewerController = {
  toFirestore: (reviewer: Reviewer) => {
    return {
      name: reviewer.name,
      email: reviewer.email,
      set: reviewer.set,
    }
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let reviewer = new Reviewer(data.name, data.email, data.set)

    return reviewer
  },
}
