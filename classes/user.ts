import firebase from '../firebase'

export class User {
  name: string
  email: string
  mobile: Number | null
  role: string
  sets: Array<string>

  constructor(
    name: string,
    email: string,
    mobile: Number | null,
    role: string,
    sets: Array<string>,
  ) {
    this.name = name
    this.email = email
    this.mobile = mobile
    this.role = role
    this.sets = sets
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
    )

    return user
  },
}
