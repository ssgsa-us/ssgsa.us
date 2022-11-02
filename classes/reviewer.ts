import firebase from '../firebase'

export class Reviewer {
  email: string
  name: string
  sets: Array<string>

  constructor(email: string, name: string, sets: Array<string>) {
    this.email = email
    this.name = name
    this.sets = sets
  }
}

export const reviewerController = {
  toFirestore: (reviewer: Reviewer) => {
    return {
      email: reviewer.email,
      name: reviewer.name,
      sets: reviewer.sets,
    }
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let reviewer = new Reviewer(data.email, data.name, data.sets)

    return reviewer
  },
}
