import path from 'path'
import firebase, { firestore } from '../../firebase'
import { AwardeesType } from '../../types'

export const getAwardees = async () => {
  let awardees: AwardeesType = await firestore
    .doc(path.join('constants', 'awardees'))
    .get()
    .then((snapshot: firebase.firestore.DocumentSnapshot<AwardeesType>) => {
      return snapshot.data()
    })

  return awardees
}
