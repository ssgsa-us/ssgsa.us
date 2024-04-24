import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  firebaseAdmin,
  adminAuth,
  adminFirestore,
} from '../../../../firebase/admin'
import Roles from '../../../../constants/roles'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, email, password, sets } = req.body

  try {
    const userId: string | null = await adminFirestore
      .collection('users')
      .where('email', '==', email)
      .get()
      .then((users) => {
        if (users.empty) return null
        return users.docs[0].id
      })

    if (!userId) {
      const user: UserRecord = await adminAuth.createUser({ email, password })

      await adminFirestore.doc(`users/${user.uid}`).set({
        name: name,
        email: email,
        mobile: 0,
        roles: [Roles.INTERVIEWER],
        review_sets: [],
        interview_sets: sets,
        verificationEmailEpoch: new Date().getTime(),
      })
    } else {
      await adminFirestore.doc(`users/${userId}`).update({
        roles: firebaseAdmin.firestore.FieldValue.arrayUnion[Roles.INTERVIEWER],
        interview_sets: sets,
      })
    }

    await adminFirestore
      .collection('interviewer_invites')
      .doc(email)
      .update({ account_created: true })

    res.status(200).send({ success: true })
  } catch (e) {
    console.log(e)
    res.status(400).send({ success: false })
  }
}
