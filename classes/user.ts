import firebase from '../firebase'

export class User {
  name: string
  email: string
  mobile: Number | null
  role: string
  sets: Array<string>
  verificationEmailEpoch: number

  constructor(
    name: string,
    email: string,
    mobile: Number | null,
    role: string,
    sets: Array<string>,
    verificationEmailEpoch: number,
  ) {
    this.name = name
    this.email = email
    this.mobile = mobile
    this.role = role
    this.sets = sets
    this.verificationEmailEpoch = verificationEmailEpoch
  }
}

export const userController = {
  toFirestore: (user: User) => {
    return {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      sets: user.sets,
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
      data.role,
      data.sets,
      data.verificationEmailEpoch,
    )

    return user
  },
}
