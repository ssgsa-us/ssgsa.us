import firebase from '../firebase'

export class User {
  name: string
  email: string
  mobile: Number | null
  roles: Array<string>
  review_sets: Array<string>
  interview_sets: Array<string>
  verificationEmailEpoch: number

  constructor(
    name: string,
    email: string,
    mobile: Number | null,
    roles: Array<string>,
    review_sets: Array<string>,
    interview_sets: Array<string>,
    verificationEmailEpoch: number,
  ) {
    this.name = name
    this.email = email
    this.mobile = mobile
    this.roles = roles
    this.review_sets = review_sets
    this.interview_sets = interview_sets
    this.verificationEmailEpoch = verificationEmailEpoch
  }
}

export const userController = {
  toFirestore: (user: User) => {
    return {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      roles: user.roles,
      review_sets: user.review_sets,
      interview_sets: user.interview_sets,
      verificationEmailEpoch: user.verificationEmailEpoch,
    }
  },

  fromFirestore: (
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions,
  ) => {
    let data = snapshot.data(options)
    let user = new User(
      data.name,
      data.email,
      data.mobile,
      data.roles,
      data.review_sets,
      data.interview_sets,
      data.verificationEmailEpoch,
    )

    return user
  },
}
