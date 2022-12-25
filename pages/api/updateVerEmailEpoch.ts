import path from 'path'
import { firestore } from '../../firebase'

export const updateVerEmailEpoch = (
  userUID: string,
  verificationEmailEpoch: number,
) => {
  firestore
    .doc(path.join('users', userUID))
    .update({ verificationEmailEpoch: verificationEmailEpoch })
}
